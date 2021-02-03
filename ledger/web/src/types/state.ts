import { Payment } from "./payment";

export type PaymentState =
  | {
      status: "success" | "error" | "loading";
      list: Payment[];
      msg: string;
    }
  | { status: "download"; file: Blob; list: Payment[]; msg: string };

export type PaymentAction =
  | { type: "request" }
  | { type: "loaded"; list: Payment[] }
  | { type: "error"; msg: string }
  | { type: "closeMsg" }
  | { type: "download"; file: Blob };
