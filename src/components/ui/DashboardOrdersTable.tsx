import { useGetOrdersQuery } from '@/app/services/ordersSlice';
import { Box, IconButton, Spinner, Table } from '@chakra-ui/react';
import { IOrder, IOrderProduct } from '@/interfaces';
import { useColorModeValue } from './color-mode';
import { FaTrash } from 'react-icons/fa';
import { useDeleteOrderMutation, useUpdateOrderMutation } from '@/app/services/ordersSlice';
import { useState } from 'react';
import SharedAlertDialog from '@/shared/AlertDialog';
import ShippingStatusSelect from './ShippingStatusSelect';
import { toaster } from './toaster';

const DashboardOrdersTable = () => {
  const { data, isLoading, error } = useGetOrdersQuery({ page: 1 });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDelete, { isLoading: isDelete }] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderMutation();
  const tableBgColor = useColorModeValue('gray.100', 'gray.700');
  const rowBgColor = useColorModeValue('gray.100', 'gray.900');

  const handleDeleteBtn = (id: string) => {
    setOrderId(id);
    setOpenDialog(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateOrderStatus({
      id,
      status,
    });
    toaster.create({
      title: 'Order status updated',
      description: 'The order status has been updated',
      type: 'success',
    });
  };

  if (isLoading || error) return <Spinner />;

  return (
    <Box
      style={{ width: '85%', overflowX: 'auto' }}
      border={'1px solid '}
      borderColor={tableBgColor}
      px={2}
      rounded={'lg'}
      boxShadow={'md'}
    >
      <Table.Root size="lg" interactive>
        <Table.Header>
          <Table.Row bg={rowBgColor}>
            <Table.ColumnHeader>Order ID</Table.ColumnHeader>
            <Table.ColumnHeader>Order Date</Table.ColumnHeader>
            <Table.ColumnHeader>Order Products</Table.ColumnHeader>
            <Table.ColumnHeader>Order Status</Table.ColumnHeader>
            <Table.ColumnHeader>Order Total</Table.ColumnHeader>
            <Table.ColumnHeader>Order User</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Order Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.data.map((order: IOrder) => (
            <Table.Row key={order.id} bg={rowBgColor}>
              <Table.Cell>{order.id}</Table.Cell>
              <Table.Cell>{order.createdAt}</Table.Cell>
              <Table.Cell>
                {order.orders.map((order: IOrderProduct) => (
                  <Box key={order.productTitle} display="flex" alignItems="center" gap={4}>
                    <span>
                      {order.productTitle} x {order.productQuantity}
                    </span>
                  </Box>
                ))}
              </Table.Cell>
              <Table.Cell>
                <ShippingStatusSelect
                  apiValue={order.shippingStatus}
                  onChange={(status) => handleStatusChange(order.documentId, status)}
                />
              </Table.Cell>
              <Table.Cell>{order.totalprice}</Table.Cell>
              <Table.Cell>{order.user.username}</Table.Cell>
              <Table.Cell textAlign="end">
                <IconButton
                  variant="solid"
                  colorPalette="red"
                  ml={2}
                  onClick={() => handleDeleteBtn(order.documentId)}
                >
                  <FaTrash />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <SharedAlertDialog
        title="Delete Order"
        description="Are you sure you want to delete this order?"
        cancelText="Cancel"
        confirmText="Delete"
        open={openDialog}
        onOpenChange={setOpenDialog}
        onConfirm={() => {
          if (orderId) {
            orderDelete(orderId);
          }

          setOpenDialog(false);

          setOrderId(null);
        }}
        isLoading={isDelete}
      />
    </Box>
  );
};

export default DashboardOrdersTable;
