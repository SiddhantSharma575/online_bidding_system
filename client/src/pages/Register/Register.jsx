import React, { useState } from 'react'
import './register.css'
// import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
    const navigate = useNavigate()
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setLoading(true)
        const result = await axios.post("http://localhost:4000/auth/register", {
            username: username,
            email: email,
            password: password
        })
        console.log(result.data)
        setUserName("")
        setEmail("")
        setPassword("")
        setLoading(false)
        navigate("/login")
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="form_container">
                <div className='left_side'>
                    <h4>Sign Up</h4>
                    <OutlinedInput placeholder='Enter Username' value={username} onChange={(e) => setUserName(e.target.value)} />
                    <OutlinedInput placeholder='Enter Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <OutlinedInput placeholder='Enter Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn' onClick={handleRegister} >Register</button>
                    <button className='btn' onClick={() => navigate("/login")} >Login</button>
                    {loading && <h4>Loading...</h4>}
                </div>
                <div className='right_side'>
                    <h3>Hello, Friend!</h3>
                    <p>Enter your Personal Details and start journey with us!</p>
                </div>
            </div>
        </div>
    )
}

export default Register