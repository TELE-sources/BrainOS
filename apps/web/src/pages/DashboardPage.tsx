import { Box, Typography, Grid, Card, CardContent, Button, Chip, Stack, TextField, Tab, Tabs } from '@mui/material';
import { LineChart, BarChart, PieChart, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import { DashboardStats, QualityMetric, LabSampleStats } from '../types/dashboard';
import { apiClient } from '../services/apiClient';

const useDashboardData = () => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await apiClient.get('/quality/dashboard');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const LabSampleStatusChart = () => {
  const { data, isLoading, error } = useQuery<LabSampleStats[]>({
    queryKey: ['lab-samples-status'],
    queryFn: async () => {
      const response = await apiClient.get('/quality/lab-samples/stats');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <PieChart
            data={data.map(item => ({
              name: item.status,
              value: item.count,
              fill: getStatusColor(item.status),
            }))}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'received': return '#4caf50';
    case 'in_progress': return '#2196f3';
    case 'completed': return '#ff9800';
    case 'rejected': return '#f44336';
    case 'archived': return '#9e9e9e';
    default: return '#9e9e9e';
  }
};

const QualityMetricsChart = () => {
  const { data, isLoading, error } = useQuery<any[]>({
    queryKey: ['quality-metrics'],
    queryFn: async () => {
      const response = await apiClient.get('/quality/metrics/trend');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="defectRate" stroke="#ff9800" name="Defect Rate" />
          <Line type="monotone" dataKey="yield" stroke="#4caf50" name="Yield" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

const RecentActivity = () => {
  const { data, isLoading, error } = useQuery<any[]>({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const response = await apiClient.get('/activity/recent');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" component="div">
        Recent Activity
      </Typography>
      <Box sx={{ mt: 1 }}>
        {data.map((activity: any, index: number) => (
          <Box key={index} sx={{ p: 1, mb: 1, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {format(new Date(activity.timestamp), 'MMM d, hh:mm a')}
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {activity.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const DashboardPage = () => {
  const { data: stats, isLoading, error } = useDashboardData();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error loading dashboard: {error.message}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quality Dashboard
      </Typography>
      
      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Samples
              </Typography>
              <Typography variant="h4">
                {stats?.totalSamples || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
              <Typography variant="h4">
                {stats?.inProgress || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Pass Rate
              </Typography>
              <Typography variant="h4">
                {stats?.passRate?.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Avg. Cycle Time
              </Typography>
              <Typography variant="h4">
                {stats?.avgCycleTime?.toFixed(1)} hrs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 1, p: 2 }}>
            <Typography variant="h6" component="div">
              Sample Status Distribution
            </Typography>
            <LabSampleStatusChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 1, p: 2 }}>
            <Typography variant="h6" component="div">
              Quality Trends
            </Typography>
            <QualityMetricsChart />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 3, border: '1px solid', borderColor: 'grey.200', borderRadius: 1, p: 2 }}>
            <Typography variant="h6" component="div">
              Recent Activity
            </Typography>
            <RecentActivity />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
