import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./login.css";

import { Form, Button} from "react-bootstrap";
import {RhContext} from "../../../context/rhContext.jsx";

import {saveLocalStorage} from "../../../helpers/localStorageUtils/localStorageUtils.js";

import BackgroundImage from "../../../assets/background.png";
import Logo from "../../../assets/logo.png";


const initialValue = {
    email: "",
    password: "",
}

export const Login = () => {

    const {setToken} = useContext(RhContext);
    const [login, setLogin] = useState(initialValue);

    const navigate = useNavigate();


    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/users-app/loginIn", login)
            .then((res) => {
                setToken(res.data.token);
                saveLocalStorage("token", res.data.token);
                if (res.status === 200) {
                    setLogin(initialValue);
                    navigate("/");
                } else {
                    setLogin(initialValue);
                }

            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setLogin(initialValue);
                }
            });
    };


    return (
        <div>
            <div
                className="sign-in__wrapper"
                style={{backgroundImage: `url(${BackgroundImage})`}}
            >
                <div className="sign-in__backdrop"></div>
                {/* Form */}
                <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                    {/* Header */}
                    <img
                        className="img-thumbnail mx-auto d-block mb-2"
                        src={Logo}
                        alt="logo"
                    />
                    <div className="h4 mb-2 text-center">Log in</div>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={login.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={login.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <p>
                        Are you not registered? <Link to="/register">Sign up</Link>
                    </p>
                    <Button onClick={handleSubmit} className="w-100" variant="primary" type="submit">
                        Log In
                    </Button>
                </Form>
            </div>
        </div>
    );
};
