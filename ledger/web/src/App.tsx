import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import DatabaseImporter from "./DatabaseImporter";
import LedgerRow from "./LedgerRow";

// function TodosApp() {
//   // Note: `dispatch` won't change between re-renders
//   const [todos, dispatch] = useReducer(todosReducer);

//   return (
//     <TodosDispatch.Provider value={dispatch}>
//       <DeepTree todos={todos} />
//     </TodosDispatch.Provider>
//   );
// }

type Payment = {
    docNo: string; // Номер документа
    date: Date; // Дата операции
    amount: number; // Сумма
    currency: string; // Валюта
    note: string; // Назначение платежа

    account: string; // Счет
    companyRegistry: string; // ЕГРПОУ
    bankCode: string; // МФО

    agent: string; // Корреспондент
    agentAccount: string; //Счет корреспондента
    agentCompanyRegistry: string; //ЕГРПОУ корреспондента
    agentBank: string; // Название банка
    agentBankCode: string; // МФО банка
};

type State =
    | { status: "empty" }
    | { status: "loading" }
    | { status: "loaded"; payments: Payment[] }
    | { status: "error"; error: string };

type Action = { type: "request" } | { type: "success"; results: Payment[] } | { type: "failure"; error: string };

const reducer = function (state: State, action: Action): State {
    switch (action.type) {
        case "request":
            return { status: "loading" };
        case "success":
            return { status: "loaded", payments: action.results };
        case "failure":
            return { status: "error", error: action.error };
    }
};

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, { status: "empty" });
    const inputImportDbNode = React.useRef<HTMLInputElement | null>(null);

    const fetchPayments = async () => {
        fetch("http://localhost:5000/payments")
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: "success", results: data.payments });
            })
            .catch((error) => {
                dispatch({ type: "failure", error: error });
            });
    };

    const openFileSelector = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const node = inputImportDbNode.current
        node && node.click();
    };

    const parseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    }

    React.useEffect(() => {
        dispatch({ type: "request" });
        fetchPayments();
    }, []);

    return (
        <div className="App">
            <input ref={inputImportDbNode} onChange={parseFile} id="input-import-db" className="hidden" type="file" />
            <button onClick={openFileSelector} id="button-import-db">Import</button>
            {state.status === "loading" && <span>Loading...</span>}
            {state.status === "loaded" && (
                <ul>
                    {state.payments && state.payments.map((payment) => <li key={payment.docNo}>{payment.amount}</li>)}
                </ul>
            )}
            {state.status === "error" && <span>Error: {state.error}</span>}
        </div>
    );
};

export default App;
