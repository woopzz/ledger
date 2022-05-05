import * as React from 'react';

import { Header } from 'MyComponents/Header';
import { PaymentTableList } from 'MyComponents/PaymentTableList';

import 'MyStyles/header.css';
import 'MyStyles/main.css';
import 'MyStyles/payments-table.css';
import 'MyStyles/payments.css';
import 'MyStyles/state.css';

export const App = () => {
    return (
        <>
            <Header />
            <PaymentTableList />
        </>
    )
}
