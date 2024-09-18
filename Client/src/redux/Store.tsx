import { configureStore } from '@reduxjs/toolkit'
import DonationSlice from './DonationSlice'

export const Store = configureStore({
    reducer: {
        donation:DonationSlice
    },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
