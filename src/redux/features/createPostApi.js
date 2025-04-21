import { baseApi } from "../api/baseApi";

const createPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCreatePost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["createPost"],
    }),
    getSinglePost: builder.query({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["createPost"],
    }),
    createPosts: builder.query({
      query: ({ page, limit, brand, sort, searchParams }) => ({
        url: "/posts",
        method: "GET",
        params: { page, limit, brand, sort , searchParams},
      }),
      providesTags: ["createPost"],
    }),
    updateCreatePost: builder.mutation({
      query: ({ data, id }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["createPost"],
    }),
    deleteCreatePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["createPost"],
    }),
  }),
});

export const {
  useCreateCreatePostMutation,
  useCreatePostsQuery,
  useUpdateCreatePostMutation,
  useDeleteCreatePostMutation,
  useGetSinglePostQuery,
} = createPostApi;
