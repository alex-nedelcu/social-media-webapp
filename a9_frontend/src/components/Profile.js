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
            <p>
                <strong>ID:</strong> {user.id}
            </p>
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Role:</strong> {user.role}
            </p>
        </div>
    );
};

export default Profile;
