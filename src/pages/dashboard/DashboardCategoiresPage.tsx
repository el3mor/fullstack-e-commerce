import DashboardCategoriesTable from '@/components/ui/DashboardCategoiresTable';
import { Box } from '@chakra-ui/react';

const DashboardCategoriesPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={10}>
      <DashboardCategoriesTable />
    </Box>
  );
};

export default DashboardCategoriesPage;
