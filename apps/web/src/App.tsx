import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-hot-toast';
import { Provider } from 'zustand';

// Import layouts and pages
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuthStore } from './store/authStore';

// MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#424242',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Auth store
const useAuth = useAuthStore();

function App() {
  const { user, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-4 border-primary/20 border-t-primary h-12 w-12"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ToastContainer position="top-center" />
          {!user ? (
            <Navigate to="/login" replace />
          ) : (
            <>
              <Routes>
                <Route path="/login" element={<LoginPage onLogin={login} />} />
                <Route 
                  path="/" 
                  element={
                    <MainLayout>
                      <DashboardPage />
                    </MainLayout>
                  }
                >
                  {/* Protected routes will go here */}
                  <Route path="/quality/lab-samples" element={<div>Lab Samples Page</div>} />
                  <Route path="/quality/control-charts" element={<div>Control Charts Page</div>} />
                  <Route path="/quality/inspections" element={<div>Inspections Page</div>} />
                  <Route path="/quality/ncapa" element={<div>NC/CAPA Page</div>} />
                  <Route path="/quality/dashboard" element={<DashboardPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
