import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className="d-flex flex-column flex-grow-1 w-100">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default App;
