import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import type { MainLayoutNavItem } from "./index.types";

/** Fixed width of the permanent navigation drawer in pixels. */
const DRAWER_WIDTH = 280;

const menuItems: MainLayoutNavItem[] = [
  { icon: <DashboardIcon />, label: "Overview", path: "/" },
  { icon: <EmailIcon />, label: "Email Address Normalizer", path: "/email" },
  { icon: <PhoneIcon />, label: "Phone Number Normalizer", path: "/phone" },
  { icon: <UploadFileIcon />, label: "Batch Normalizer", path: "/csv" },
];

/**
 * Provides the app chrome: top bar, sidebar navigation, and routed page outlet.
 */
export const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.paper",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
          color: theme.palette.text.primary,
          // Keep the bar above the permanent drawer.
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            sx={{ display: { sm: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="primary" sx={{ fontWeight: 500 }} variant="h6">
            Directly Identifiying Information (DII) Operator
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "calc(100% - 64px)",
            top: "64px",
            width: DRAWER_WIDTH,
          },
          flexShrink: 0,
          width: DRAWER_WIDTH,
        }}
        variant="permanent"
      >
        <List sx={{ pt: 2 }}>
          {menuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <ListItem disablePadding key={item.path}>
                <ListItemButton
                  component={NavLink}
                  end={item.path === "/"}
                  selected={isActive}
                  sx={{ px: 2, py: 1 }}
                  to={item.path}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "primary.main" : "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 500 : 400,
                        },
                      },
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
          backgroundColor: "transparent",
          flexGrow: 1,
          minHeight: "100vh",
          p: 3,
          pt: "88px",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
