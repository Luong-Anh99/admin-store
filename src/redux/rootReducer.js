import { combineReducers } from "redux";
import categoryReducer from "./category/categoryReducer";
import orderReducer from "./order/orderReducer";
import productReducer from "./product/productReducer";
import sizeReducer from "./size/sizeReducer";
import userReducer from "./user/userReducer";

export default combineReducers ({
    users: userReducer,
    products: productReducer,
    orders:orderReducer,
    categories: categoryReducer,
    sizes:sizeReducer
})