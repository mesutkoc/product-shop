import { configureStore } from '@reduxjs/toolkit';
import products from './productSlice';
import categories from './categorySlice'

export const store = configureStore({
    reducer: {
        products, categories
    },
});