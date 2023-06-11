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

export const getProductById = (id) => async (dispatch) => {
    const response = await axios.get(`${PROJECT_CONSTANTS.productAPI}/${id}`).then((response) => response.data);

    dispatch(fetchProductById(response));
};

export const updatePage = (page) => (dispatch) => {
    dispatch(setPage(page))
}

export const selectCategoryIfExist = (category, currentPage) => {
    return category ? getProductsByCategory(category) : getProductsByPage(currentPage);
}

const initialState = {
    loading: false,
    currentPage: PROJECT_CONSTANTS.initialPage,
    products: {},
    product: {}
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setPage: (state, data) => {
            state.currentPage = data.payload
        },
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
        fetchProductById: (state, data) => {
            state.product = data.payload
        }
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

export const { fetchProductsByCategory, fetchProductsByPage, fetchProductById, setPage } = productSlice.actions;

export default productSlice.reducer;