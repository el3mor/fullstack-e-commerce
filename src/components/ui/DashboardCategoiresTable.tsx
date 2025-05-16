import { Box, IconButton, Table, Input, Field, Button, Stack, Text } from '@chakra-ui/react';
import { useColorModeValue } from './color-mode';
import TableSkeleton from './TableSkeleton';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useAddCategoryMutation,
} from '@/app/services/categoiresSlice';
import { ICategory } from '@/interfaces';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import SharedAlertDialog from '@/shared/AlertDialog';
import { useState } from 'react';
import SharedCustomModel from '@/shared/CustomModel';
import { toaster } from './toaster';

const DashboardCategoriesTable = () => {
  const [openDialog, SetOpenDialog] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);
  const rowBgColor = useColorModeValue('gray.100', 'gray.900');
  const tableBgColor = useColorModeValue('gray.100', 'gray.700');
  const { isLoading, data, error } = useGetCategoriesQuery({ page: 1 });
  const [categoryDelete, { isLoading: isDelete, isSuccess: isDeleteSuccess }] =
    useDeleteCategoryMutation();
  const [categoryUpdate, { isLoading: isUpdate, isSuccess: isUpdateSuccess }] =
    useUpdateCategoryMutation();
  const [categoryAdd, { isLoading: isAdd, isUninitialized: isAddSuccess }] =
    useAddCategoryMutation();
  const handleDeleteBtn = (id: string) => {
    setCategoryId(id);
    SetOpenDialog(true);
  };

  const handleEditBtn = (category: ICategory) => {
    setCategoryToEdit(category);
    setCategoryId(category.documentId);
    setOpenModel(true);
  };

  const handleOnChanage = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCategoryToEdit((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdateProduct = () => {
    categoryUpdate({
      id: categoryId || '',
      formData: {
        data: {
          title: categoryToEdit?.title,
        },
      },
    });
    if (isUpdateSuccess) {
      toaster.create({
        title: 'Category updated successfully',
        type: 'success',
      });
      setOpenModel(false);
    }
  };

  const handleAddProduct = () => {
    categoryAdd({
      data: {
        title: categoryToEdit?.title,
      },
    });
    if (!isAddSuccess) {
      toaster.create({
        title: 'Category added successfully',
        type: 'success',
      });
      setOpenAddModel(false);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }
  if (error) {
    return (
      <Box style={{ width: '100%', overflowX: 'auto' }} spaceY={10}>
        <Button disabled>Create Category</Button>
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row bg={rowBgColor}>
              <Table.ColumnHeader>ID</Table.ColumnHeader>

              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Products Count</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row bg={rowBgColor}>
              <Table.Cell colSpan={4} textAlign="center" height="100px">
                <Stack gap={20} alignItems="center" justifyContent="center" mt={10}>
                  <Text fontSize="lg" fontWeight="bold">
                    No categories found
                  </Text>
                  <Button
                    variant="outline"
                    colorPalette="blue"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Refresh
                  </Button>
                </Stack>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    );
  }
  return (
    <Box style={{ width: '85%', overflowX: 'auto' }} spaceY={10}>
      <Button
        onClick={() => {
          setCategoryToEdit(null);
          setOpenAddModel(true);
        }}
      >
        Add Category
      </Button>
      <Box border={'1px solid '} borderColor={tableBgColor} px={2} rounded={'lg'} boxShadow={'lg'}>
        <Table.Root size="lg" interactive>
          <Table.Header>
            <Table.Row bg={rowBgColor}>
              <Table.ColumnHeader>ID</Table.ColumnHeader>

              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Products Count</Table.ColumnHeader>

              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.data.map((item: ICategory) => {
              const { products } = item;
              return (
                <Table.Row key={item.id} bg={rowBgColor}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{products.length}</Table.Cell>

                  <Table.Cell textAlign="end">
                    <IconButton
                      variant="solid"
                      colorPalette="green"
                      ml={2}
                      aria-label="Edit product"
                      onClick={() => handleEditBtn(item)}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      variant="solid"
                      colorPalette="red"
                      ml={2}
                      onClick={() => handleDeleteBtn(item.documentId)}
                    >
                      <FaTrash />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>
      <SharedAlertDialog
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        cancelText="Cancel"
        confirmText="Delete"
        open={openDialog}
        onOpenChange={SetOpenDialog}
        onConfirm={() => {
          if (categoryId) {
            categoryDelete(categoryId);
          }
          if (isDeleteSuccess) {
            toaster.create({
              title: 'Category deleted successfully',
              type: 'success',
            });
            SetOpenDialog(false);
            setCategoryId(null);
          }
        }}
        isLoading={isDelete}
      />
      <SharedCustomModel
        title="Update Product"
        cancelText="Cancel"
        confirmText="Update"
        open={openModel}
        onOpenChange={setOpenModel}
        onSubmit={handleUpdateProduct}
        isLoading={isUpdate}
      >
        <Box as="form" spaceY={5}>
          <Field.Root>
            <Field.Label>Product Title</Field.Label>
            <Input
              type="text"
              placeholder="Product Title"
              value={categoryToEdit?.title}
              variant="outline"
              name="title"
              onChange={handleOnChanage}
            />
          </Field.Root>
        </Box>
      </SharedCustomModel>
      <SharedCustomModel
        title="Add Product"
        cancelText="Cancel"
        confirmText="Add"
        open={openAddModel}
        onOpenChange={setOpenAddModel}
        onSubmit={handleAddProduct}
        isLoading={isAdd}
      >
        <Box as="form" spaceY={5}>
          <Field.Root>
            <Field.Label>Product Title</Field.Label>
            <Input
              type="text"
              placeholder="Product Title"
              value={categoryToEdit?.title}
              variant="outline"
              name="title"
              onChange={handleOnChanage}
            />
          </Field.Root>
        </Box>
      </SharedCustomModel>
    </Box>
  );
};

export default DashboardCategoriesTable;
