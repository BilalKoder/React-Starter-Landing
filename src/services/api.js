import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_API_URL;

export const api = createApi({
  reducerPath: "messagelyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        method: "GET",
        url: "users",
      }),
    }),
    getUsage: builder.query({
      query: () => ({
        method: "GET",
        url: "usage",
      }),
    }),
    cancelSubscription: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: "subscription/cancel",
      }),
    }),
    editSubscription: builder.mutation({
      query: () => ({
        method: "PATCH",
        url: "subscription/upgrade",
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        method: "GET",
        url: "get-user-data",
      }),
    }),
    signUpUser: builder.query({}),
    getPlanDetails: builder.query({
      query: () => ({
        method: "GET",
        url: "subscription/plan-details",
      }),
    }),
    getUserHistory: builder.query({
      query: (arg) => {
        const userId = arg?.userId;
        const createdAt = arg?.createdAt;
        const _id = arg?._id;

        return {
          method: "GET",
          url: `history?userId=${userId}&createdAt=${createdAt}&_id=${_id}`,
        };
      },
    }),
    contactSales: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: "contact-sales",
        body: arg,
      }),
    }),
    changeUserInfo: builder.mutation({
      query: (arg) => ({
        method: "POST",
        url: "change-user-info",
        body: arg,
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const emailUpdateStatus = data?.emailUpdateStatus;
          const metadataStatus = data?.metaDataStatus;
          const { email, first_name, last_name } = params;

          dispatch(
            api.util.updateQueryData("getUserInfo", undefined, (draft) => {
              return emailUpdateStatus == "OK"
                ? Object.assign(draft, {
                    email,
                    metadata: {
                      first_name,
                      last_name,
                    },
                  })
                : Object.assign(draft, {
                    metadata: {
                      first_name,
                      last_name,
                    },
                  });
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUserInfoQuery,
  useGetUserInfoQuery,
  useChangeUserInfoMutation,
  useLazyGetUserHistoryQuery,
  useCancelSubscriptionMutation,
  useEditSubscriptionMutation,
  useLazyGetUsageQuery,
  useLazyGetPlanDetailsQuery,
  useContactSalesMutation,
} = api;
