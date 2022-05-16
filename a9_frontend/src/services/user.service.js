import axios from "axios";
import {BASE_URL} from "../constants";
import {authenticationHeader} from "./authentication-header";

const getPublicContent = () => {
    return axios.get(`${BASE_URL}/public`);
}

const getUserBoard = () => {
    return axios.get(
        `${BASE_URL}/user`,
        {
            headers: authenticationHeader()
        });
}

export const UserService = {
    getPublicContent,
    getUserBoard
};