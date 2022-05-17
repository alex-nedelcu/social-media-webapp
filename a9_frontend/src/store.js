import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/authentication";
import message from "./reducers/message";

const reducer = {
    auth,
    message
};

const store = configureStore({
    reducer,
    devTools: true,
});

export default store;
