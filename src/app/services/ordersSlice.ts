import CookieServices from '@/classes/CookieServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrder } from '@/interfaces';

export const ordersSlice = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Order'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/orders?populate=*&pagination[page]=${page}&pagination[pageSize]=7`,
          headers: {
            Authorization: `Bearer ${CookieServices.get('jwt')}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: IOrder) => ({ type: 'Order', id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: `/api/orders`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
        body: body,
      }),
      async onQueryStarted(
        { id, ...patch }: { id: string | undefined; body: FormData },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          ordersSlice.util.updateQueryData('getOrders', { page: 1 }, (draft) => {
            const order = draft.data.find((order: IOrder) => order.id === Number(id));
            if (order) {
              Object.assign(order, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }: { id: string | undefined; status: string }) => ({
        url: `/api/orders/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
        body: {
          data: {
            shippingStatus: status,
          },
        },
      }),
      async onQueryStarted(
        { id, ...patch }: { id: string | undefined; status: string },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          ordersSlice.util.updateQueryData('getOrders', { page: 1 }, (draft) => {
            const order = draft.data.find((order: IOrder) => order.id === Number(id));
            if (order) {
              Object.assign(order, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useAddOrderMutation,
} = ordersSlice;
