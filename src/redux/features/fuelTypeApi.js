import { baseApi } from "../api/baseApi";

const fuelTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFuelType: builder.mutation({
      query: (data) => ({
        url: "/fuel-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["fuelType"],
    }),
    fuelTypes: builder.query({
      query: () => ({
        url: "/fuel-types",
        method: "GET",
      }),
      providesTags: ["fuelType"],
    }),
    updateFuelType: builder.mutation({
      query: ({ data, id }) => ({
        url: `/fuel-types/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["fuelType"],
    }),
    deleteFuelType: builder.mutation({
      query: (id) => ({
        url: `/fuel-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fuelType"],
    }),
  }),
});

export const {
  useCreateFuelTypeMutation,
  useFuelTypesQuery,
  useUpdateFuelTypeMutation,
  useDeleteFuelTypeMutation,
} = fuelTypeApi;
