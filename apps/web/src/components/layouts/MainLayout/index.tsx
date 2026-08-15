import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import type { MainLayoutNavItem } from './index.types';

/** Fixed width of the permanent navigation drawer in pixels. */
const DRAWER_WIDTH = 280;

const menuItems: MainLayoutNavItem[] = [
  { path: '/', label: 'Overview', icon: <DashboardIcon /> },
  { path: '/email', label: 'Email Address Normalizer', icon: <EmailIcon /> },
  { path: '/phone', label: 'Phone Number Normalizer', icon: <PhoneIcon /> },
  { path: '/csv', label: 'Batch Normalizer', icon: <UploadFileIcon /> },
];

/**
 * Provides the app chrome: top bar, sidebar navigation, and routed page outlet.
 */
export const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          // Keep the bar above the permanent drawer.
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
            Directly Identifiying Information (DII) Operator
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <List sx={{ pt: 2 }}>
          {menuItems.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  end={item.path === '/'}
                  selected={isActive}
                  sx={{ py: 1, px: 2 }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'primary.main' : 'inherit',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          pt: '88px',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
