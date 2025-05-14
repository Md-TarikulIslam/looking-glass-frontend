import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { SERVER_API } from "../../config/config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_API}`,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = getState()?.auth?.token;

    headers.set("ngrok-skip-browser-warning", "true");
    // headers.set("Access-Control-Allow-Origin", "*");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // const refreshToken = getRefreshToken();

  if (result?.error?.status === 404) {
    toast.error(result.error.data.message);
  }
  // if (result?.error?.status === 401) {
  //   const res = await fetch(`${SERVER_API}/auth/refresh-token`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       refreshToken: refreshToken,
  //     }),
  //   });
  //   const data = await res.json();

  //   if (data?.data?.token) {
  //     const user = api.getState().auth.user;

  //     api.dispatch(
  //       setCredentials({
  //         user,
  //         token: data.data.token,
  //       })
  //     );

  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logout());
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
