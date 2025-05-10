import theme from '@/style/theme';
import { CircularProgress, Box } from '@mui/material';

const FullScreenLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: `${theme.validTheme.formBackground}`,
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullScreenLoader;