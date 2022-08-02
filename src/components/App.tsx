import * as React from 'react';

import { Header } from './Header';
import { PaymentTableList } from './PaymentTableList';

import '../css/header.css';
import '../css/main.css';
import '../css/payments-table.css';
import '../css/payments.css';
import '../css/state.css';

export const App = () => {
    return (
        <>
            <Header />
            <PaymentTableList />
        </>
    )
}
