import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { loginSuccess } from '../Auth/AuthSlice'

const USER_API = 'http://localhost:5000/api/auth' 

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (InputData) => ({
                url: '/Register',
                method: 'POST',
                body: InputData,
            }),
        }),
        login: builder.mutation({
            query: (InputData) => ({
                url: '/Login',
                method: 'POST',
                body: InputData,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(loginSuccess({ user: data.user }))
                } catch (error) {
                    console.error('Login error:', error)
                }
            },
        }),
    }),
})  

export const { useRegisterMutation, useLoginMutation } = authApi
