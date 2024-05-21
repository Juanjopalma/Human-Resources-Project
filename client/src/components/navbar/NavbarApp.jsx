import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { RhContext } from "../../context/rhContext.jsx";
import { delLocalStorage } from "../../helpers/localStorageUtils/localStorageUtils.js";
import './navBarApp.scss';

export const NavbarApp = () => {
    const { token, setToken, user, setUser } = useContext(RhContext);
    const navigate = useNavigate();

    const logout = () => {
        delLocalStorage("token");
        setUser();
        setToken();
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Human Resources</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {token && (
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/agregar">Add Employee</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={logout} className="nav-link">LogOut</Link>
                            </li>
                        </ul>
                    )}
                    {token && (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item-user">
                                <Link className="nav-link">{user}</Link>
                            </li>
                        </ul>
                    )}
                    {!token && (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};
