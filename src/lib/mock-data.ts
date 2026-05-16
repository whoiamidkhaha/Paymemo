export type TxStatus = "Confirmed" | "Pending" | "Failed" | "Needs Review" | "Waiting Sign";
export type TxCategory = "Payroll" | "Vendor Payment" | "Invoice" | "Bridge" | "Swap" | "Business Expense" | "Refund" | "Personal";

export type Tx = {
  id: string;
  date: string;
  hash: string;
  amount: number;
  token: "USDC" | "USDT" | "PYUSD" | "DAI";
  category: TxCategory;
  counterparty: string;
  note: string;
  status: TxStatus;
  type: "Sent" | "Received";
};

export const transactions: Tx[] = [
  { id: "1", date: "Oct 14", hash: "0x4f2a...9a12", amount: 8500, token: "USDC", category: "Payroll", counterparty: "Sarah Jenkins", note: "October payroll - engineering", status: "Confirmed", type: "Sent" },
  { id: "2", date: "Oct 13", hash: "0x91bd...c204", amount: 4200, token: "USDC", category: "Vendor Payment", counterparty: "Aether Studio", note: "Q4 brand identity", status: "Confirmed", type: "Sent" },
  { id: "3", date: "Oct 13", hash: "0x77ae...4490", amount: 25000, token: "USDT", category: "Bridge", counterparty: "Across Protocol", note: "L1 → Arbitrum liquidity", status: "Confirmed", type: "Sent" },
  { id: "4", date: "Oct 12", hash: "0x2c08...18df", amount: 1250, token: "USDC", category: "Business Expense", counterparty: "AWS", note: "Infra - October", status: "Pending", type: "Sent" },
  { id: "5", date: "Oct 11", hash: "0xd341...9f02", amount: 12500, token: "PYUSD", category: "Invoice", counterparty: "Mercury Labs", note: "Invoice INV-204 paid", status: "Confirmed", type: "Received" },
  { id: "6", date: "Oct 10", hash: "0x88c2...77a1", amount: 640, token: "USDC", category: "Swap", counterparty: "Uniswap v4", note: "USDC → DAI rebalance", status: "Confirmed", type: "Sent" },
  { id: "7", date: "Oct 09", hash: "0xa9f0...02bc", amount: 320, token: "USDC", category: "Personal", counterparty: "0x9a12...77", note: " - ", status: "Needs Review", type: "Sent" },
  { id: "8", date: "Oct 08", hash: "0x5b71...e1c4", amount: 6800, token: "USDC", category: "Payroll", counterparty: "Marcus Lin", note: "September contractor", status: "Confirmed", type: "Sent" },
  { id: "9", date: "Oct 07", hash: "0x14de...88a0", amount: 950, token: "USDC", category: "Vendor Payment", counterparty: "Figma", note: "Annual seats", status: "Failed", type: "Sent" },
];

export const kpis = {
  totalSent: 84200,
  totalReceived: 142500,
  pendingIntents: 12,
  confirmedRecords: 412,
  needsReview: 3,
};

export const monthly = [
  { m: "Apr", sent: 32000, received: 18000 },
  { m: "May", sent: 41000, received: 22000 },
  { m: "Jun", sent: 38000, received: 31000 },
  { m: "Jul", sent: 52000, received: 28000 },
  { m: "Aug", sent: 64000, received: 47000 },
  { m: "Sep", sent: 71000, received: 58000 },
  { m: "Oct", sent: 84200, received: 142500 },
];

export type Invoice = {
  id: string;
  number: string;
  client: string;
  amount: number;
  token: "USDC" | "PYUSD";
  due: string;
  status: "Draft" | "Sent" | "Paid" | "Cancelled";
};

export const invoices: Invoice[] = [
  { id: "i1", number: "INV-204", client: "Mercury Labs", amount: 12500, token: "PYUSD", due: "Oct 11", status: "Paid" },
  { id: "i2", number: "INV-205", client: "Northwind DAO", amount: 8400, token: "USDC", due: "Oct 22", status: "Sent" },
  { id: "i3", number: "INV-206", client: "Helios Studio", amount: 3200, token: "USDC", due: "Oct 28", status: "Draft" },
  { id: "i4", number: "INV-203", client: "Quanta Capital", amount: 15750, token: "USDC", due: "Sep 30", status: "Paid" },
  { id: "i5", number: "INV-202", client: "Atlas Bridge", amount: 2100, token: "USDC", due: "Sep 18", status: "Cancelled" },
];

export type PayoutRow = { id: string; name: string; address: string; amount: number; status: "Queued" | "Signed" | "Confirmed" };
export const payoutBatch = {
  name: "October Payroll - Engineering",
  total: 42500,
  rows: [
    { id: "p1", name: "Sarah Jenkins", address: "0x4f2a...9a12", amount: 8500, status: "Confirmed" as const },
    { id: "p2", name: "Marcus Lin", address: "0x5b71...e1c4", amount: 6800, status: "Confirmed" as const },
    { id: "p3", name: "Aiko Tanaka", address: "0x91bd...c204", amount: 7200, status: "Signed" as const },
    { id: "p4", name: "Devon Park", address: "0x77ae...4490", amount: 6500, status: "Queued" as const },
    { id: "p5", name: "Priya Rao", address: "0xd341...9f02", amount: 7100, status: "Queued" as const },
    { id: "p6", name: "Leo Vargas", address: "0x2c08...18df", amount: 6400, status: "Queued" as const },
  ],
};
