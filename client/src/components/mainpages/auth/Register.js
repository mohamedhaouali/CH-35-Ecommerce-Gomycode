import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./register.css";

function Register() {
    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', { ...user })

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
                    <form onSubmit={registerSubmit}>
                        <div className="loginBox">
                            <input type="text" name="name" placeholder="Name" className="loginInput"
                                value={user.name} onChange={onChangeInput} />

                            <input type="email" name="email" placeholder="Email" className="loginInput"
                                required
                                value={user.email} onChange={onChangeInput}
                            />

                            <input type="password" name="password" placeholder="Password" className="loginInput"
                                required autoComplete="on"
                                value={user.password} onChange={onChangeInput}
                            />

                            <button type="submit" className="loginButton">Register</button>
                            <button className="loginRegisterButton">
                                <Link to="/login">Login</Link>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register