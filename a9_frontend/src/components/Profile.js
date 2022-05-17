import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{user.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>ID:</strong> {user.id}
            </p>
            <p>
                <strong>Account type:</strong> {user.role}
            </p>
        </div>
    );
};

export default Profile;
