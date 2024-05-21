import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './register.css';

import { Form, Button} from "react-bootstrap";
import {RhContext} from "../../../context/rhContext.jsx";

import {saveLocalStorage} from "../../../helpers/localStorageUtils/localStorageUtils.js";

import BackgroundImage from "../../../assets/background.png";
import Logo from "../../../assets/logo.png";


const initialValue = {
    email: "",
    password: "",
}

export const Register = () => {

    const [register, setRegister] = useState(initialValue);

    const navigate = useNavigate();


    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegister({...register, [name]:value})
    }

    const handleSubmit = () => {
        axios
            .post("http://localhost:8080/users-app/signIn", register)
            .then((res) => {
                console.log(res)
                navigate("/login");

            })
            .catch((err) => {
                console.log(err);
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
                    <div className="h4 mb-2 text-center">Sign up</div>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={register.email}
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
                            value={register.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <p>
                        Are you already registered? <Link to="/login">Log in</Link>
                    </p>
                    <Button className="w-100" variant="primary" type="submit">
                        Sign In
                    </Button>
                </Form>
            </div>
        </div>
    );
};
