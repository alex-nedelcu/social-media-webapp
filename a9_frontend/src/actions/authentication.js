import {AuthenticationService} from "../services/authentication.service";
import {REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE} from "./types";

export const register = (username, password, role) => (dispatch) => {
    return AuthenticationService.register(username, password, role).then(
        response => {
            dispatch({type: REGISTER_SUCCESS});
            dispatch({type: SET_MESSAGE, payload: response.data.message});

            return Promise.resolve();
        },
        error => {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();

            dispatch({type: REGISTER_FAIL});
            dispatch({type: SET_MESSAGE, payload: message});

            return Promise.reject();
        }
    )
}