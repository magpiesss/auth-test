import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import {useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer
    },
});

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<RootState>();