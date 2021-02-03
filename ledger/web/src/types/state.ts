import { Payment } from "./payment";

export type PaymentState = { list: Payment[]; msg: string } & (
  | {
      status: "success" | "error" | "loading";
    }
  | { status: "download"; file: Blob }
);

export type PaymentAction =
  | { type: "request" }
  | { type: "loaded"; list: Payment[] }
  | { type: "error"; msg: string }
  | { type: "closeMsg" }
  | { type: "download"; file: Blob };
