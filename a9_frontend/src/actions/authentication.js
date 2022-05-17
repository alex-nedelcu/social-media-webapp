import { authenticationService } from "../services/authentication.service";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE } from "./types";

export const register = (username, password, role) => (dispatch) => {
    return authenticationService.register(username, password, role).then(
        response => {
            dispatch({ type: REGISTER_SUCCESS });
            dispatch({ type: SET_MESSAGE, payload: response.data.message });

            return Promise.resolve();
        },
        error => {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();

            dispatch({ type: REGISTER_FAIL });
            dispatch({ type: SET_MESSAGE, payload: message });

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return authenticationService.login(username, password).then(
        data => {
            dispatch({ type: LOGIN_SUCCESS, payload: { user: data } });
            return Promise.resolve();
        },
        error => {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();

            dispatch({ type: LOGIN_FAIL });
            dispatch({ type: SET_MESSAGE, payload: message });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    authenticationService.logout();
    dispatch({ type: LOGOUT });
};