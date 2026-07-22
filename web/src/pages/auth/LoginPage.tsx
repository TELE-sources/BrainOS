import { Box, TextField, Button, Typography, Link, TypographyProps, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';

export const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const navigate = useNavigate();
  const { login: storeLogin } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      // const response = await apiClient.post('/auth/login', { email, password });
      // const user = response.data;
      
      // Mock user data for demo
      const user = {
        id: 1,
        email,
        name: 'Demo User',
        role: 'quality_manager',
        permissions: ['quality:read', 'quality:write']
      };
      
      storeLogin(user);
      onLogin(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mx: 'auto', mt: 5, width: 400, p: 4 }}>
      <LockOutlinedIcon fontSize="large" sx={{ display: 'block', marginBottom: 2 }} />
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Sign in to BrainERPOS
      </Typography>
      
      {error && (
        <Typography color="error" variant="body2" align="center" mb={2}>
          {error}
        </Typography>
      )}
      
      <TextField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        mb={2}
        autoFocus
      />
      
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        mb={3>
        </TextField>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <Link href="#" color="primary" variant="body2">
            Contact administrator
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
