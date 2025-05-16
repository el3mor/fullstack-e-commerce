import CookieServices from '@/classes/CookieServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '@/interfaces';

export const categoriesSlice = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Category'],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/categories?populate=*&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: ICategory) => ({ type: 'Category', id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: `/api/categories`,
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
          categoriesSlice.util.updateQueryData('getCategories', { page: 1 }, (draft) => {
            const category = draft.data.find((category: ICategory) => category.id === Number(id));
            if (category) {
              Object.assign(category, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation({
      query: ({
        id,
        formData,
      }: {
        id: string | undefined;
        formData: FormData | { data: Record<string, any> };
      }) => ({
        url: `/api/categories/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
        body: formData,
      }),
      async onQueryStarted(
        {
          id,
          ...patch
        }: { id: string | undefined; formData: FormData | { data: Record<string, any> } },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          categoriesSlice.util.updateQueryData('getCategories', { page: 1 }, (draft) => {
            const category = draft.data.find((category: ICategory) => category.id === Number(id));
            if (category) {
              Object.assign(category, patch);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/categories/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CookieServices.get('jwt')}`,
        },
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useAddCategoryMutation,
} = categoriesSlice;
