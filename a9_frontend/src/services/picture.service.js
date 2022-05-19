import http from '../http-common';
import { getCurrentUser } from "../utils/utils";

const upload = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("accountId", getCurrentUser().id);

    return http.post("/pictures/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

const getPictures = () => {
    return http.get("/pictures");
}

export const pictureService = {
    upload,
    getPictures
}