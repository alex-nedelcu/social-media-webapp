import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { history } from "./utils/history";
import { clearMessage } from "./actions/message";
import { logout } from "./actions/authentication";

import EventBus from "./common/EventBus";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Wall from "./components/Wall";
import TopPictures from "./components/TopPictures";

const App = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            console.log("Dispatching clearMessage() action");
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        console.log("Dispatching logout() action");
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
        <BrowserRouter history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={{ pathname: "/" }} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {user && (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={{ pathname: "/wall" }} className="nav-link">
                                        Wall
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={{ pathname: "/top" }} className="nav-link">
                                        Top Pictures
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>

                    {user ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={{ pathname: "/profile" }} className="nav-link">
                                    Profile Details
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
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
                                    Register
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/wall" element={<Wall/>}/>
                        <Route path="/top" element={<TopPictures/>}/>
                    </Routes>
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
