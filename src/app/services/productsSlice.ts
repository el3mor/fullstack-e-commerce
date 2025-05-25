import CookieServices from '@/classes/CookieServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '@/interfaces';

export const productsSlice = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Product'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/products?populate=categories&populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: IProduct) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: `/api/products`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
        body,
      }),
      async onQueryStarted(
        { id, ...patch }: { id: string | undefined; body: FormData },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          productsSlice.util.updateQueryData('getDashboardProducts', { page: 1 }, (draft) => {
            const product = draft.data.find((product: IProduct) => product.id === Number(id));
            if (product) {
              Object.assign(product, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }: { id: string | undefined; body: FormData }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
        body,
      }),
      async onQueryStarted(
        { id, ...patch }: { id: string | undefined; body: FormData },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          productsSlice.util.updateQueryData('getDashboardProducts', { page: 1 }, (draft) => {
            const product = draft.data.find((product: IProduct) => product.id === Number(id));
            if (product) {
              Object.assign(product, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddProductMutation,
} = productsSlice;
