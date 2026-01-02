import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Link, Menu, MenuItem, Toolbar } from '@mui/material';
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import usePostTypes from '../hooks/usePostTypes';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);
  const { postTypes } = usePostTypes();
  const isDevelopment = import.meta.env.MODE === 'development';

  const filteredPostTypes = useMemo<string[]>(() => {
    const result = [...postTypes];

    return result.filter((x) => x !== 'featured');
  }, [postTypes]);

  return (
    <AppBar position="static" elevation={1}>
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
            {filteredPostTypes.map((type) => (
              <MenuItem
                key={type}
                component={RouterLink}
                to={`/${type}`}
                onClick={() => setMenuOpen(null)}
              >
                {type}
              </MenuItem>
            ))}

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

          {filteredPostTypes.map((type) => (
            <Link
              key={type}
              component={RouterLink}
              to={`/${type}`}
              underline="none"
              className="me-2"
            >
              {type}
            </Link>
          ))}
          {isDevelopment && (
            <Link component={RouterLink} to={'/admin'} color="error">
              admin
            </Link>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
}
