import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getGoods = createAsyncThunk(
    'goods/getGoods',
    async (thunkAPI) => {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const result = await response.json();
        result.length = 50;
        return result;
        
    }
)
export const goodsSlice = createSlice({
    name: 'goods',
    initialState: {
        entities: [],
        loading: false

    },
    extraReducers: {
        [getGoods.pending]: (state) => {
            state.loading = true;
            
        },
        [getGoods.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.entities = payload;
        },
        [getGoods.rejected]:(state) => {
            state.loading = false;
        },
    }
});


export default goodsSlice.reducer;

export { getGoods };


