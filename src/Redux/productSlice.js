import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PROJECT_CONSTANTS from '../constants';


export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios.get(`${PROJECT_CONSTANTS.productAPI}?limit=10`).then((response) => response.data);
})

export const getProductsByCategory = (category) => async (dispatch) => {
    const response = await axios.get(`${PROJECT_CONSTANTS.productAPI}/category/${category?.label}`).then((response) => response.data);

    dispatch(fetchProductsByCategory(response));
};

export const getProductsByPage = (productGap) => async (dispatch) => {
    const response = await axios.get(`${PROJECT_CONSTANTS.productAPI}?limit=10&skip=${productGap}`).then((response) => response.data);

    dispatch(fetchProductsByPage(response));
};

const initialState = {
    loading: false,
    firstPage: PROJECT_CONSTANTS.initialPage,
    products: {}
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductsByCategory: (state, data) => {
            const newData = data?.payload?.products.map(item => ({
                ...item,
                key: item.id
            }))
            const payload = data.payload;
            state.products = { ...payload, products: newData };
        },
        fetchProductsByPage: (state, data) => {
            const newData = data?.payload?.products.map(item => ({
                ...item,
                key: item.id
            }))
            const payload = data.payload;
            state.products = { ...payload, products: newData };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            const newData = action?.payload?.products.map(item => ({
                ...item,
                key: item.id
            }))
            const payload = action.payload;
            state.products = { ...payload, products: newData };
            state.error = '';
        })
    }
});

export const { fetchProductsByCategory, fetchProductsByPage } = productSlice.actions;

export default productSlice.reducer;