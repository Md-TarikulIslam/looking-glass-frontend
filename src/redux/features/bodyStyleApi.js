import { baseApi } from "../api/baseApi";

const bodyStyleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBodyStyle: builder.mutation({
      query: (data) => ({
        url: "/body-styles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bodyStyle"],
    }),
    bodyStyles: builder.query({
      query: () => ({
        url: "/body-styles",
        method: "GET",
      }),
      providesTags: ["bodyStyle"],
    }),
    updateBodyStyle: builder.mutation({
      query: ({ data, id }) => ({
        url: `/body-styles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bodyStyle"],
    }),
    deleteBodyStyle: builder.mutation({
      query: (id) => ({
        url: `/body-styles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bodyStyle"],
    }),
  }),
});

export const {
  useCreateBodyStyleMutation,
  useBodyStylesQuery,
  useUpdateBodyStyleMutation,
  useDeleteBodyStyleMutation,
} = bodyStyleApi;
