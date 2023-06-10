import { ErrorBoundary } from 'react-error-boundary';
import PaymentsPage from '../pages/PaymentsPage';
import ErrorPage from '../pages/ErrorPage';
import '../main.css';

const App = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <PaymentsPage />
        </ErrorBoundary>
    );
}

export default App;
