import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authentication"

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const usernameValidation = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const passwordValidation = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkButton = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkButton.current.context._errors.length === 0) {
            dispatch(register(username, password, "user"))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, usernameValidation]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, passwordValidation]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Register</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkButton}/>
                </Form>
            </div>
        </div>
    );
};

export default Register;
