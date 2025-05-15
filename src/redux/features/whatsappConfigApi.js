import { baseApi } from "../api/baseApi";

const whatsappConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    whatsappConfigs: builder.query({
      query: (params) => ({
        url: "/settings/whatsapp-config",
        method: "GET",
        params: params,
      }),
      providesTags: ["whatsappConfigs"],
    }),

    updateWhatsappConfig: builder.mutation({
      query: ({ data, id }) => ({
        url: `/settings/update-whatsapp-config/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["whatsappConfigs"],
    }),
  }),
});

export const { useWhatsappConfigsQuery, useUpdateWhatsappConfigMutation } = whatsappConfigApi;
