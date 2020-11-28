import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/user/register", { ...user });

            localStorage.setItem("firstLogin", true);

            window.location.href = "/products";
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="login-page">
            <h2>Register</h2>
            <form onSubmit={registerSubmit}>
                <label name="name">Full name</label>
                <input
                    type="text"
                    name="name"
                    require
                    placeholder="Name"
                    value={user.name}
                    onChange={onChangeInput}
                />

                <label name="email">Email</label>
                <input
                    type="email"
                    name="email"
                    require
                    placeholder="Email"
                    value={user.email}
                    onChange={onChangeInput}
                />

                <label name="password">Password</label>
                <input
                    type="password"
                    name="password"
                    require
                    placeholder="Password"
                    value={user.password}
                    onChange={onChangeInput}
                />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
