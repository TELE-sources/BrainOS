import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, CssBaseline } from '@mui/material';
import { DashboardOutlined, InboxOutlined, UploadOutlined, FolderOpenOutlined, BarChartOutlined, ProfileOutlined } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BrainERPOS
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[{
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            path: '/',
          }, {
            icon: <InboxOutlined />,
            label: 'Lab Samples',
            path: '/quality/lab-samples',
          }, {
            icon: <UploadOutlined />,
            label: 'Control Charts',
            path: '/quality/control-charts',
          }, {
            icon: <FolderOpenOutlined />,
            label: 'Inspections',
            path: '/quality/inspections',
          }, {
            icon: <BarChartOutlined />,
            label: 'NC/CAPA',
            path: '/quality/ncapa',
          }, {
            icon: <ProfileOutlined />,
            label: 'Profile',
            path: '/profile',
          }].map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end className={({ isActive }) => (isActive ? 'active' : '')}>
                <ListItem button divider>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </NavLink>
            </li>
          ))}
        </List>
        <Divider sx={{ marginY: 2 }} />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlined fontSize="inherit" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
        }}
      >
        <AppBar position="fixed" top={0} elevation={3}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {user && (
                <>
                  <Badge badgeContent={4} color="error">
                    <NotificationsNone fontSize="inherit" />
                  </Badge>
                  <Box sx={{ ml: 2 }}>
                    <AvatarAlt src="/images/avatar.jpg" alt="User Avatar" sx={{ width: 32, height: 32 }} />
                  </Box>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ pt: 4, px: 3, minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
