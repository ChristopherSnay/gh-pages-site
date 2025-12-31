import { AppBar, Toolbar, Typography } from '@mui/material';
import { VERSION } from '../version';

export default function Footer() {
  return (
    <AppBar position="relative" className="mt-5" elevation={0}>
      <div className="container">
        <Toolbar className="d-flex flex-column justify-content-center">
          <span>christophersnay.com © {new Date().getFullYear()}</span>

          <Typography variant="caption" color="textDisabled">
            Version {VERSION}
          </Typography>
        </Toolbar>
      </div>
    </AppBar>
  );
}
