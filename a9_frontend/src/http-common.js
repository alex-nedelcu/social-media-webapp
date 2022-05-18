import axios from "axios";
import { BASE_URL } from "./constants";
import { authenticationHeader } from "./services/authentication-header";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        ...authenticationHeader(),
    }
});