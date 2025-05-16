import DashboardOrdersTable from '@/components/ui/DashboardOrdersTable';
import { Box } from '@chakra-ui/react';

const DashboardOrdersPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={10}>
      <DashboardOrdersTable />
    </Box>
  );
};

export default DashboardOrdersPage;
