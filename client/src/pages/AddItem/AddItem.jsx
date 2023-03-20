import React, { useState } from 'react'
import "./addItem.css"
import Header from "../../components/Header"
import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect } from 'react';
import axios from "axios"
import { storage } from "../../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


const AddItem = ({ socket }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [file, setFile] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
    }, [])

    const handleAdd = async () => {
        setLoading(true);
        if (!productName || !price || !file) {
            setError("All Items are Required!");
            setLoading(false)
            return;
        }
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // try {
                    //     const res = await axios.post("http://localhost:4000/product/add", )
                    //     console.log(res)
                    //     setLoading(false)
                    //     navigate("/")
                    // } catch (error) {
                    //     console.log(error)
                    //     setLoading(false)
                    // }
                    socket.emit("addProduct", {
                        product_name: productName,
                        price: price,
                        owner_name: user.username,
                        last_bidder_name: user.username,
                        owner_id: user._id,
                        last_bidder_id: user._id,
                        imgURL: downloadURL
                    })
                    navigate("/")
                });
            }
        );

    }

    return (
        <>
            <Header />
            <div className="add_item_container" style={{ position: "relative" }}>
                <h5 style={{ textAlign: "center", position: "absolute", left: 440 }} >Add an Product</h5>
                <div className='add_item_left'>
                    <OutlinedInput placeholder="Enter Product Name" value={productName} onChange={(e) => {
                        setProductName(e.target.value);
                        setError("");
                        setLoading(false);
                    }
                    } />
                    <OutlinedInput placeholder='Enter Price' type="number" value={price} onChange={(e) => {
                        setPrice(e.target.value)
                        setError("");
                        setLoading(false);
                    }} />
                    <OutlinedInput placeholder='Enter Username' value={user.username} />
                </div>
                <div className='add_item_right'>
                    <div>
                        <label htmlFor="photo">Select an Image</label>
                        <input type="file" id='photo' onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button onClick={handleAdd} >Add</button>
                    {loading && <h4>Loading...</h4>}
                    {error && <h4>{error}</h4>}
                </div>
            </div>
        </>

    )
}

export default AddItem