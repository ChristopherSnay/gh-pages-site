import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className="d-flex flex-column w-100">
        <Outlet />
      </main>
    </>
  );
}

export default App;
