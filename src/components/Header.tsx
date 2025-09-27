import { AppBar, Toolbar } from '@mui/material';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';

export default function Header() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </Toolbar>
    </AppBar>
  );
}
