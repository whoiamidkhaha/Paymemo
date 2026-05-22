/**
 * Mirror confirmed extension_records into the encrypted vault (vault_records)
 * so they appear in /app/ledger.
 *
 * Why this exists:
 *
 *   The browser extension popup / sidepanel writes memos via
 *   `/api/extension-intent`, which lands in the `extension_records` table.
 *   The extension cannot write directly to `vault_records` because it has
 *   no access to the dApp's vault encryption key (the key is derived from
 *   a wallet-signature on the dApp side - see `crypto-vault.ts`).
 *
 *   Result: a memo saved via the extension popup shows up in the Review
 *   page's "Completed" tab (which reads from both tables) but does NOT
 *   show up in the Ledger (which reads only from `vault_records`).
 *
 *   To close the gap we mirror confirmed extension_records into the vault
 *   from any dApp page that already has the vault unlocked. The next time
 *   the user opens /app/review or /app/ledger after saving a memo from
 *   the extension, the row gets backfilled into the ledger automatically.
 *
 *   Idempotent: a row whose `txHash` is already in `vault_records` is
 *   skipped, so re-running the mirror is safe.
 */

import { encryptPrivateMetadata } from "./crypto-vault";
import type { ExtensionRecord } from "./extension-records";
import { normalizeRecord, payMemoCategories, type PayMemoRecordInput } from "./paymemo-schema";
import {
  syncEncryptedVaultRecord,
  toPrivateMetadata,
  toPublicRecord,
  type StoredVaultRecord,
} from "./paymemo-vault";

type MirrorSession = { walletAddress: string };

/**
 * Mirror a single confirmed extension_record into the encrypted vault.
 *
 * Returns the stored vault record on success, or `null` if the mirror was
 * skipped (validation failed, encryption error, or the server rejected the
 * upsert). Errors are swallowed so a single bad row never blocks the
 * batch helper below.
 */
export async function mirrorExtensionRecordToVault(
  extensionRecord: ExtensionRecord,
  session: MirrorSession,
  key: CryptoKey,
): Promise<StoredVaultRecord | null> {
  if (extensionRecord.status !== "confirmed") return null;

  // Coerce category back into the allowed enum - extension popup users can
  // type anything into the category field, and the dApp ledger filter uses
  // a fixed list, so an unknown category would just look ugly.
  const category = (payMemoCategories as readonly string[]).includes(extensionRecord.category)
    ? (extensionRecord.category as PayMemoRecordInput["category"])
    : ("Other" as PayMemoRecordInput["category"]);

  try {
    const normalized = normalizeRecord({
      ...extensionRecord,
      id: extensionRecord.id,
      status: "confirmed",
      chainId: 2910,
      chainName: "Morph Hoodi Testnet",
      mode: "wallet-assist",
      source: extensionRecord.source ?? "browser-extension",
      to: extensionRecord.to || session.walletAddress,
      amount: extensionRecord.amount || "0",
      token: extensionRecord.token || "ETH",
      category,
    });

    const encryptedMetadata = await encryptPrivateMetadata(
      toPrivateMetadata(normalized),
      key,
      session.walletAddress,
    );

    const stored: StoredVaultRecord = {
      id: normalized.id ?? extensionRecord.id ?? crypto.randomUUID(),
      walletAddress: session.walletAddress,
      publicRecord: toPublicRecord(normalized),
      encryptedMetadata,
      syncStatus: "synced",
      updatedAt:
        extensionRecord.reviewedAt ?? extensionRecord.updatedAt ?? new Date().toISOString(),
    };

    await syncEncryptedVaultRecord(stored);
    return stored;
  } catch (error) {
    console.warn(
      "[paymemo] mirrorExtensionRecordToVault failed",
      extensionRecord.id ?? extensionRecord.txHash,
      error,
    );
    return null;
  }
}

/**
 * Find every confirmed extension_record whose `txHash` is NOT already in
 * the vault and mirror them in. Skips rows without a tx hash (we can't
 * dedupe them safely) and rows that are already in `existingVaultTxHashes`.
 *
 * Returns the freshly-mirrored records so callers can append them to
 * their in-memory list without waiting for a re-fetch round trip.
 */
export async function mirrorOrphanedExtensionRecords(params: {
  extensionRecords: ExtensionRecord[];
  existingVaultTxHashes: Set<string>;
  session: MirrorSession;
  key: CryptoKey;
}): Promise<StoredVaultRecord[]> {
  const { extensionRecords, existingVaultTxHashes, session, key } = params;

  const orphans = extensionRecords.filter((record) => {
    if (record.status !== "confirmed") return false;
    const hash = (record.txHash || "").toLowerCase();
    if (!hash) return false;
    return !existingVaultTxHashes.has(hash);
  });

  if (orphans.length === 0) return [];

  const mirrored: StoredVaultRecord[] = [];
  for (const orphan of orphans) {
    const result = await mirrorExtensionRecordToVault(orphan, session, key);
    if (result) mirrored.push(result);
  }
  return mirrored;
}
