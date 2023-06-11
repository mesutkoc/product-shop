import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PROJECT_CONSTANTS from '../constants';


export const fetchCategory = createAsyncThunk('category/fetchCategory', () => {
    return axios.get(`${PROJECT_CONSTANTS.categoryAPI}`).then((response) => response.data);
})

const initialState = {
    loading: false,
    categories: []
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.loading = false;
            const newData = action?.payload?.map((item, index) => ({
                label: item,
                key: index + 1
            }))
            state.categories = newData;
            state.error = '';
        })
    }
});

export const { } = categorySlice.actions;

export default categorySlice.reducer;