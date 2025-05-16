import {
  Box,
  IconButton,
  Image,
  Table,
  Input,
  Field,
  Textarea,
  NumberInput,
  FileUpload,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useColorModeValue } from './color-mode';
import TableSkeleton from './TableSkeleton';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
  useUpdateProductMutation,
} from '@/app/services/productsSlice';
import { IProduct } from '@/interfaces';
import { FaEye, FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SharedAlertDialog from '@/shared/AlertDialog';
import { useState } from 'react';
import SharedCustomModel from '@/shared/CustomModel';
import { HiUpload } from 'react-icons/hi';

const DashboardProductTable = () => {
  const [openDialog, SetOpenDialog] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const rowBgColor = useColorModeValue('gray.100', 'gray.900');
  const tableBgColor = useColorModeValue('gray.100', 'gray.700');
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  const [productDelete, { isLoading: isDelete }] = useDeleteProductMutation();
  const [productUpdate, { isLoading: isUpdate }] = useUpdateProductMutation();
  const [productAdd, { isLoading: isAdd }] = useAddProductMutation();
  const handleDeleteBtn = (id: string) => {
    setProductId(id);
    SetOpenDialog(true);
  };

  const handleEditBtn = (product: IProduct) => {
    setProductToEdit(product);
    setProductId(product.documentId);
    setOpenModel(true);
  };

  const handleOnChanage = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProductToEdit((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const onChangePriceHandler = (value: string) => {
    setProductToEdit((prev) => (prev ? { ...prev, price: +value } : null));
  };

  const onChangeStockHandler = (value: string) => {
    setProductToEdit((prev) => (prev ? { ...prev, stock: +value } : null));
  };

  const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleUpdateProduct = () => {
    const hasThumbnail = thumbnail instanceof File;

    if (hasThumbnail) {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          title: productToEdit?.title,
          description: productToEdit?.description,
          price: productToEdit?.price,
          stock: productToEdit?.stock,
        }),
      );
      formData.append('files.thumbnail', thumbnail);

      productUpdate({
        id: productId || '',
        formData,
      });
    } else {
      productUpdate({
        id: productId || '',
        formData: {
          data: {
            title: productToEdit?.title,
            description: productToEdit?.description,
            price: productToEdit?.price,
            stock: productToEdit?.stock,
          },
        },
      });
    }
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        title: productToEdit?.title,
        description: productToEdit?.description,
        price: productToEdit?.price,
        stock: productToEdit?.stock,
      }),
    );
    if (thumbnail) {
      formData.append('files.thumbnail', thumbnail);
    }

    productAdd({
      data: {
        title: productToEdit?.title,
        description: productToEdit?.description,
        price: productToEdit?.price,
        stock: productToEdit?.stock,
      },
      files: {
        thumbnail: thumbnail,
      },
    });
  };

  if (isLoading) {
    return <TableSkeleton />;
  }
  if (error) {
    return (
      <Box style={{ width: '100%', overflowX: 'auto' }} spaceY={10}>
        <Button disabled>Create Product</Button>
        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row bg={rowBgColor}>
              <Table.ColumnHeader>ID</Table.ColumnHeader>

              <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Stock</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan={6} textAlign="center" height="100px">
                <Stack gap={20} alignItems="center" justifyContent="center" mt={10}>
                  <Text fontSize="lg" fontWeight="bold">
                    No products found
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
          setProductToEdit(null);
          setOpenAddModel(true);
        }}
      >
        Add Product
      </Button>
      <Box border={'1px solid '} borderColor={tableBgColor} px={2} rounded={'lg'} boxShadow={'lg'}>
        <Table.Root size="lg" interactive>
          <Table.Header>
            <Table.Row bg={rowBgColor}>
              <Table.ColumnHeader>ID</Table.ColumnHeader>

              <Table.ColumnHeader>Thumbnail</Table.ColumnHeader>
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Category</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Stock</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={'end'}>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.data.map((item: IProduct) => {
              const { url } = item?.thumbnail?.formats?.small || {};
              return (
                <Table.Row key={item.id} bg={rowBgColor}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>
                    {url && <Image src={`${url}`} alt={item.title} width={50} height={50} />}
                  </Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.categories[0]?.title}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>{item.stock}</Table.Cell>
                  <Table.Cell textAlign="end">
                    <IconButton
                      variant="solid"
                      colorPalette="blue"
                      ml={2}
                      aria-label="View product"
                    >
                      <Link to={`/products/${item.documentId}`}>
                        <FaEye />
                      </Link>
                    </IconButton>
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
          if (productId) {
            productDelete(productId);
          }

          SetOpenDialog(false);

          setProductId(null);
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
              value={productToEdit?.title}
              variant="outline"
              name="title"
              onChange={handleOnChanage}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Description</Field.Label>
            <Textarea
              placeholder="Product Description"
              value={productToEdit?.description}
              variant="outline"
              name="description"
              onChange={handleOnChanage}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Price</Field.Label>
            <NumberInput.Root
              defaultValue={productToEdit?.price ? String(productToEdit.price) : undefined}
              w="full"
              onValueChange={(e) => onChangePriceHandler(e.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Stocks</Field.Label>
            <NumberInput.Root
              defaultValue={productToEdit?.stock ? String(productToEdit.stock) : undefined}
              w="full"
              onValueChange={(e) => onChangeStockHandler(e.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Thumbnail</Field.Label>
            <FileUpload.Root accept={['image/png']} onChange={onChangeThumbnailHandler}>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
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
              value={productToEdit?.title}
              variant="outline"
              name="title"
              onChange={handleOnChanage}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Description</Field.Label>
            <Textarea
              placeholder="Product Description"
              value={productToEdit?.description}
              variant="outline"
              name="description"
              onChange={handleOnChanage}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Price</Field.Label>
            <NumberInput.Root
              defaultValue={productToEdit?.price ? String(productToEdit.price) : undefined}
              w="full"
              onValueChange={(e) => onChangePriceHandler(e.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Stocks</Field.Label>
            <NumberInput.Root
              defaultValue={productToEdit?.stock ? String(productToEdit.stock) : undefined}
              w="full"
              onValueChange={(e) => onChangeStockHandler(e.value)}
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Thumbnail</Field.Label>
            <FileUpload.Root accept={['image/png']} onChange={onChangeThumbnailHandler}>
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>
          </Field.Root>
        </Box>
      </SharedCustomModel>
    </Box>
  );
};

export default DashboardProductTable;
