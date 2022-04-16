import React from 'react';

import Header from 'MyComponents/Header';
import PaymentTableList from 'MyComponents/PaymentTableList';

import 'MyStyles/header.css';
import 'MyStyles/main.css';
import 'MyStyles/payments-table.css';
import 'MyStyles/payments.css';
import 'MyStyles/state.css';

const App = () => {
    return (
        <>
            <Header />
            <PaymentTableList />
        </>
    )
}

export default App;
