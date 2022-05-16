import {getCurrentUser} from "../utils/utils";

export const authenticationHeader = () => {
    const user = getCurrentUser();

    if (user && user.token) {
        return {Authorization: `Bearer ${user.token}`};
    } else {
        return {};
    }
};