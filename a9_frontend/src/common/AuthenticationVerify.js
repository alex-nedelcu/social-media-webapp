import React from "react";
import { getCurrentUser } from "../utils/utils";
import { history } from "../utils/history";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

export const AuthenticationVerify = (props) => {
    history.listen(() => {
        const user = getCurrentUser();

        if (user) {
            const decodedJwt = parseJwt(user.token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    });

    return <div></div>;
};
