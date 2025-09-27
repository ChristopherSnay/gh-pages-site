import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
