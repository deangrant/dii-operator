import React from 'react';
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

/**
 * Defines the width of the permanent sidebar drawer in pixels. This constant is
 * used to set the width of the drawer, calculate the main content area
 * positioning and ensure consistent layout across the application.
 */
const DRAWER_WIDTH = 280;

/**
 * Defines the properties interface for the main layout component.
 *
 * @interface MainLayoutProps
 * @property {React.ReactNode} children - The content to be rendered in the main
 * area of the layout.
 * @property {string} selectedPage - The currently active page identifier, used
 * to highlight the corresponding menu item in the sidebar.
 * @property {(page: string) => void} onPageChange - A callback function
 * triggered when a menu item is clicked, allowing the parent component to
 * handle the page navigation.
 */
interface MainLayoutProps {
  children: React.ReactNode;
  selectedPage: string;
  onPageChange: (page: string) => void;
}

/**
 * The main layout component that provides the applications core structure. It
 * consists of a top app bar, a sidebar for navigation, and a main content area
 * where the selected page is rendered.
 *
 * @component
 * @param {MainLayoutProps} props - The properties for the main layout
 * component.
 * @param {React.ReactNode} props.children - The content to be rendered in the
 * main area of the layout.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  selectedPage,
  onPageChange,
}) => {
  /**
   * The theme object provides access to the application's color palette,
   * typography, and other design properties. It is used to style the
   * components within the layout.
   */
  const theme = useTheme();

  /**
   * An array of objects representing the menu items in the sidebar. Each item
   * contains an identifier, label, and icon. The identifier is used to track
   * the selected page, the label is displayed in the sidebar, and the icon is
   * shown next to the label.
   */
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
    { id: 'email', label: 'Email Address Normalizer', icon: <EmailIcon /> },
  ];

  /**
   * Renders the main layout component. It includes a top app bar, a sidebar
   * for navigation, and a main content area where the selected page is
   * rendered.
   *
   * @returns {JSX.Element} - The rendered main layout component.
   */
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Renders the top application bar, with a fixed position, white
       * background, and a border at the bottom. */}
      <AppBar
        position="fixed"
        sx={{
          // Ensures that the application bar is rendered above the
          // sidebar drawer.
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: theme.palette.text.primary,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {/* Renders the menu icon for the email address normalizer page. */}
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

      {/* Renders the sidebar, which contains the navigation menu. */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: '64px', // Height of AppBar
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <List sx={{ pt: 2 }}>
          {/* Renders the menu items in the sidebar. */}
          {menuItems.map(item => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={selectedPage === item.id}
                onClick={() => onPageChange(item.id)}
                sx={{
                  py: 1,
                  px: 2,
                }}
              >
                {/* Renders the menu item icon with dynamic color based
                             on the selected page. */}
                <ListItemIcon
                  sx={{
                    color:
                      selectedPage === item.id ? 'primary.main' : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {/* Renders the menu item label with dynamic font weight
                 * based on the selected page. */}
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: selectedPage === item.id ? 500 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Renders the main content area, with a container for the selected
       * page. */}
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
          {children}
        </Container>
      </Box>
    </Box>
  );
};
