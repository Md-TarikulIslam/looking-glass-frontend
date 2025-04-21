import { baseApi } from "../api/baseApi";

const transmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransmission: builder.mutation({
      query: (data) => ({
        url: "/transmissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transmission"],
    }),
    transmissions: builder.query({
      query: () => ({
        url: "/transmissions",
        method: "GET",
      }),
      providesTags: ["transmission"],
    }),
    updateTransmission: builder.mutation({
      query: ({ data, id }) => ({
        url: `/transmissions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["transmission"],
    }),
    deleteTransmission: builder.mutation({
      query: (id) => ({
        url: `/transmissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transmission"],
    }),
  }),
});

export const {
  useCreateTransmissionMutation,
  useTransmissionsQuery,
  useUpdateTransmissionMutation,
  useDeleteTransmissionMutation,
} = transmissionApi;
