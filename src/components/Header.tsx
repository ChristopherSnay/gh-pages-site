import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Link, Menu, MenuItem, Toolbar } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="static" elevation={0}>
      <div className="container">
        <Toolbar className="px-0">
          <div className="d-flex d-md-none me-2">
            <IconButton
              className="text-white"
              onClick={(e) => setMenuOpen(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <Menu
            open={Boolean(menuOpen)}
            anchorEl={menuOpen}
            onClose={() => setMenuOpen(null)}
          >
            {import.meta.env.MODE === 'development' && (
              <MenuItem
                component={RouterLink}
                to="/admin"
                onClick={() => setMenuOpen(null)}
              >
                Admin
              </MenuItem>
            )}
          </Menu>

          <Link
            component={RouterLink}
            variant="h6"
            to="/"
            underline="none"
            className="me-auto text-white"
          >
            christophersnay.com
          </Link>
        </Toolbar>
      </div>
    </AppBar>
  );
}
