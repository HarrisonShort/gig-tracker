import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers.js";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});