import React, { useEffect, useState } from 'react'
import './header.css'
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))
        setUser(userData)
    }, [])

    const handleLogOut = () => {
        localStorage.clear()
        setUser("")
        navigate("/login")
    }
    return (
        <div className="header_container">
            <div className="header_title">
                <h3 onClick={() => navigate("/")}>Online Bidding System</h3>
            </div>
            <div className='header_center'>
                <ul>
                    <li onClick={() => navigate("/")} >Home</li>
                    <li onClick={() => navigate("/about")}>About</li>
                    {user && <li onClick={() => navigate("/addItem")}>Add Item</li>}
                    {user && <li onClick={handleLogOut}>LogOut</li>}
                </ul>
            </div>
            <div className="header_right">
                {user ? <h3>{user.username}</h3> :
                    <button onClick={() => navigate("/login")}>Login</button>}
            </div>
        </div>
    )
}

export default Header;