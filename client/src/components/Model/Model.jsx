import React from 'react'
import './model.css'
import OutlinedInput from '@mui/material/OutlinedInput';

import { RiCloseLine } from "react-icons/ri";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Model = ({ setIsOpen, currentProduct, socket }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [newPrice, setNewPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    // console.log(currentProduct)
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"))
        setUser(userInfo)
    }, [])

    const handleUpdate = async () => {
        setLoading(true)
        // try {
        //     const updatedItem = await axios.put(`http://localhost:4000/product/update/${currentProduct._id}`, )
        //     navigate("/")
        //     setLoading(false)
        //     setIsOpen(false)
        // } catch (error) {
        //     console.log(error)
        // }
        if (Number(newPrice) > Number(currentProduct.price)) {
            socket.emit("bidProduct", {
                current_product_id: currentProduct._id,
                last_bidder_name: user.username,
                last_bidder_id: user._id,
                price: newPrice
            })
            navigate("/")
            setIsOpen(false)
        } else {
            setError("Price must be greater than" + currentProduct.price)
            setIsOpen(false)
        }
    }
    return (
        <>
            <div className="darkBG" onClick={() => setIsOpen(false)} />
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className="heading">Update Item</h5>
                    </div>
                    <button className="closeBtn" onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modalContent">
                        <OutlinedInput placeholder="Enter Product Name" value={currentProduct.product_name} />
                        <OutlinedInput placeholder='Enter New Price' type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                        {loading && <h4>Loading...</h4>}
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className="deleteBtn" onClick={handleUpdate}>
                                Update
                            </button>
                            <button
                                className="cancelBtn"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Model;