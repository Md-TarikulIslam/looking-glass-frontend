import { baseApi } from "../api/baseApi";

const configApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    configs: builder.query({
      query: (params) => ({
        url: "/settings/config",
        method: "GET",
        params: params,
      }),
      providesTags: ["config"],
    }),
    contacts: builder.query({
      query: (params) => ({
        url: "/contacts",
        method: "GET",
        params: params,
      }),
      providesTags: ["contacts"],
    }),
    updateConfig: builder.mutation({
      query: ({ data, id }) => ({
        url: `/settings/update-config/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["config"],
    }),
  }),
});

export const { useConfigsQuery, useUpdateConfigMutation, useContactsQuery } =
  configApi;
