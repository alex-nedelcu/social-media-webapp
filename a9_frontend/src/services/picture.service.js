import http from '../http-common';
import { getCurrentUser } from "../utils/utils";
import { authenticationHeader } from "./authentication-header";
import { BASE_URL } from "../constants";
import axios from "axios";

const upload = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("accountId", getCurrentUser().id);

    return http.post("/pictures/upload", formData, {
        headers: {
            ...authenticationHeader(), "Content-Type": "multipart/form-data",
        },
    });
}

const getPictures = () => {
    const user = getCurrentUser();
    const headers = user != null
        ? { 'Authorization': `Bearer ${user.token}` }
        : {}

    return axios.get(`${BASE_URL}/pictures`, {
            headers
        }
    );
}

export const pictureService = {
    upload,
    getPictures
}