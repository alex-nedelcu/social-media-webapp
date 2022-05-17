import axios from "axios";

const getPublicContent = () => {
    return axios.get(`http://localhost:8080/test`);
}

export const userService = {
    getPublicContent,
};