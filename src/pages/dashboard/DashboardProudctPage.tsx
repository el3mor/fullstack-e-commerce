import DashboardProductTable from '@/components/ui/DashboardProductTable';
import { Box } from '@chakra-ui/react';

const DashboardProductPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={10}>
      <DashboardProductTable />
    </Box>
  );
};

export default DashboardProductPage;
