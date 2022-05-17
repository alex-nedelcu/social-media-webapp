import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = BASE_URL + "/authenticate";

const register = (username, password, role) => {
    return axios.post(
        `${API_URL}/register`, {
            username,
            password,
            role
        });
};

const login = (username, password) => {
    return axios.post(
        `${API_URL}/login`, {
            username,
            password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            console.log(`Logged in: ${JSON.stringify(response.data)}`)
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
}

export const authenticationService = {
    register,
    login,
    logout
};