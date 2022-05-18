import http from '../http-common';

const upload = (file, onUploadProgress) => {
    let formData = new FormData();
    formData.append("file", file);

    return http.post("/pictures/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress
    });
}

const getPictures = () => {
    return http.get("/pictures");
}

export const pictureService = {
    upload,
    getPictures
}