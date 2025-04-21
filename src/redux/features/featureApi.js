import { baseApi } from "../api/baseApi";

const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeature: builder.mutation({
      query: (data) => ({
        url: "/features",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["feature"],
    }),
    features: builder.query({
      query: () => ({
        url: "/features",
        method: "GET",
      }),
      providesTags: ["feature"],
    }),
    updateFeature: builder.mutation({
      query: ({ data, id }) => ({
        url: `/features/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["feature"],
    }),
    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feature"],
    }),
  }),
});

export const {
  useCreateFeatureMutation,
  useFeaturesQuery,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;
