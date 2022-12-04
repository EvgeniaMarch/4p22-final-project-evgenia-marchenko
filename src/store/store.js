import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './basket/basketSlice'
import goodsSlice from "./Products/goodsSlice";


export default configureStore({
    reducer: {
        basket: basketReducer,
        goods: goodsSlice
    }
});