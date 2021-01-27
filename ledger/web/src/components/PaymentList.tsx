import React from "react";
import { Payment } from "../types/payment";

const PaymentList: React.FC<{ payments: Payment[] }> = (props) => {
  let items, emptiness;

  if (props.payments.length) {
    items = props.payments.map((x) => <li key={x.docNo}>{x.amount}</li>);
  } else {
    emptiness = <h3>You have no payments for now.</h3>;
  }

  return (
    <div className="payment-list">
      <ul>{items}</ul>
      {emptiness}
    </div>
  );
};

export default PaymentList;
