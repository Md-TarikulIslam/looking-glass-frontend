import { baseApi } from "../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
    contacts: builder.query({
      query: (params) => ({
        url: "/contacts",
        method: "GET",
        params,
      }),
      providesTags: ["contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ data, id }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
