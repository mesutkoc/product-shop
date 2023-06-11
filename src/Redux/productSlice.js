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

export const deleteProduct = (record) => async (dispatch) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    await axios.delete(`${PROJECT_CONSTANTS.productAPI}/${record?.id}`, config).then(res => dispatch(deleteExistProduct(res.data)));
}

export const updatePage = (page) => (dispatch) => {
    dispatch(setPage(page))
}

export const selectCategoryIfExist = (category) => {
    return category ? getProductsByCategory(category) : fetchProducts();
}

export const productListItems = (data) => {
    const localProducts = JSON.parse(localStorage.getItem('addedProducts'));
    const newData = data?.payload?.products.map(item => ({
        ...item,
        key: item.id
    }))
    const concatenatedArray = newData?.length > 0 && localProducts?.length > 0 ? newData.concat(localProducts) : newData;
    return concatenatedArray
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
            const concatenatedArray = productListItems(data);
            const payload = data.payload;
            state.products = { ...payload, products: concatenatedArray };
        },

        fetchProductById: (state, data) => {
            state.product = data.payload
        },
        addNewProduct: (state, data) => {
            state.addedProducts = [...state.addedProducts, data.payload]
            localStorage.setItem("addedProducts", JSON.stringify(state.addedProducts));
            state.products = { ...state.products, products: [...state.products.products, ...state.addedProducts] }
        },
        deleteExistProduct: (state, data) => {
            const new_products = state.products?.products?.filter(product => product?.id !== data?.payload?.id)
            localStorage.removeItem('addedProducts');
            state.products = { ...state.products, products: new_products };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            const concatenatedArray = productListItems(action);
            const payload = action.payload;
            state.products = {
                ...payload, products: concatenatedArray
            };
            state.error = '';
        })
    }
});

export const { fetchProductsByCategory, fetchProductById, setPage, addNewProduct, deleteExistProduct } = productSlice.actions;

export default productSlice.reducer;