import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { history } from "./utils/history";
import { clearMessage } from "./actions/message";
import { logout } from "./actions/authentication";

import EventBus from "./common/EventBus";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [user, logOut]);

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={{ pathname: "/" }} className="navbar-brand">
                        bezKoder
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={{ pathname: "/home" }} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link to={{ pathname: "/user" }} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {user ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={{ pathname: "/profile" }} className="nav-link">
                                    {user.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/logout" className="nav-link" onClick={logOut}>
                                    Log out
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={{ pathname: "/login" }} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={{ pathname: "/register" }} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>

                {/* <AuthenticationVerify logOut={logOut}/> */}
            </div>
        </Router>
    );
}

export default App;
