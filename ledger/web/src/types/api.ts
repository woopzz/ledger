import { PaymentData } from "./payment";

export type PaymentResponse = { ok: true; result: PaymentData[] } | { ok: false; msg: string };

export type CSVResponse = { ok: true; result: string } | { ok: false; msg: string };
