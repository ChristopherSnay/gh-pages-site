import { AppBar, Toolbar } from '@mui/material';

export default function Footer() {
  return (
    <AppBar position="relative" className="mt-5" elevation={0}>
      <div className="container">
        <Toolbar className="justify-content-center">
          <span>christophersnay.com © {new Date().getFullYear()}</span>
        </Toolbar>
      </div>
    </AppBar>
  );
}
