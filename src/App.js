import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Header from './components/Header/Header';
// import PrivateRoute from './router/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}
