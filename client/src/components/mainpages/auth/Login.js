import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./login.css";

function Login() {

    const [user, setUser] = useState({
        email: '', password: ''
    })

    // input pour forms event

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    //
    const loginSubmit = async e => {
        e.preventDefault()
        try {
            // appel axios
            await axios.post('/user/login', { ...user })
            //token
            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (

        <div className="login">

            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Famms</h3>

                </div>

                <div className="loginRight">
                    <form onSubmit={loginSubmit}>
                        <div className="loginBox">

                            <input type="email" name="email" required placeholder="Email" className="loginInput"
                                value={user.email} onChange={onChangeInput}
                            />
                            <input placeholder="Password"
                                type="password" name="password" required autoComplete="on"
                                value={user.password} onChange={onChangeInput}
                                className="loginInput" />

                            <button className="loginButton">Log In</button>

                            <button className="loginRegisterButton">
                                <Link to="/register">Create a new Account</Link>
                            </button>

                        </div>
                    </form>
                </div>

            </div>

        </div >
    );
}

export default Login
