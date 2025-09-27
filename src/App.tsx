import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import './App.scss';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
