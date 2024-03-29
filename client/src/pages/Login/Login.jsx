import React, { useState } from 'react'
import './login.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async () => {
        if (!username || !password) {
            setError("All Fields are Required!");
            return;
        }
        setLoading(true)
        const res = await axios.post("http://localhost:4000/auth/login", {
            username: username,
            password: password
        })
        console.log(res.data)
        if (res.data.status === "Error") {
            setError("Invalid Username or Password");
            setLoading(false);
            return;
        }
        localStorage.setItem("user", JSON.stringify(res.data.user))
        setUserName("")
        setPassword("")
        setLoading(false)
        navigate("/")
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="form_container">
                <div className='right_side'>
                    <h3>Hello, Friend!</h3>
                    <p>Enter your Personal Details and start journey with us!</p>
                </div>
                <div className='left_side'>
                    <h4>Sign In</h4>
                    <OutlinedInput placeholder='Enter Username' value={username} onChange={(e) => {
                        setUserName(e.target.value);
                        setError("")
                    }
                    } />
                    <OutlinedInput placeholder='Enter Password' type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }} />
                    <button className='btn' onClick={handleLogin} >Login</button>
                    <button className='btn' onClick={() => navigate("/register")} >Register</button>
                    {loading && <h4>Loading...</h4>}
                    {error && <h4>{error}</h4>}
                </div>
            </div>
        </div>
    )
}

export default Login