import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PROJECT_CONSTANTS from '../constants';


export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
    return axios.get(`${PROJECT_CONSTANTS.productAPI}?limit=0`).then((response) => response.data);
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

export const addProduct = (product, products) => async (dispatch) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    await axios.post(`${PROJECT_CONSTANTS.productAPI}/add`, {
        ...product, id: products?.length + 1
    }, config).then(res => dispatch(addNewProduct(res.data)));
}

export const updatePage = (page) => (dispatch) => {
    dispatch(setPage(page))
}

export const selectCategoryIfExist = (category) => {
    return category ? getProductsByCategory(category) : fetchProducts();
}

const initialState = {
    loading: false,
    currentPage: PROJECT_CONSTANTS.initialPage,
    products: {},
    product: {},
    addedProducts: []
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
        },
        addNewProduct: (state, data) => {
            state.addedProducts = [...state.addedProducts, data.payload]
            localStorage.setItem("addedProducts", JSON.stringify(state.addedProducts));
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

export const { fetchProductsByCategory, fetchProductsByPage, fetchProductById, setPage, addNewProduct } = productSlice.actions;

export default productSlice.reducer;