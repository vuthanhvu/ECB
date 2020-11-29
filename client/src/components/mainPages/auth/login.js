import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';

export default function Login() {
    const [user, setUser] = useState({
        email:'', password:''
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/login', {...user});

            localStorage.setItem('firstLogin', true);

            window.location.href="/products"

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <label name="email">Email</label>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput}/>

                <label name="email">Password</label>
                <input type="password" name="password" required
                placeholder="Password" value={user.password} onChange={onChangeInput}/>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}
