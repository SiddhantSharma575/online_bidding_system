import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './home.css'
// import Iphone from "../../images/iphone.jpg"
import Model from '../../components/Model/Model'
import axios from "axios"

const Home = ({ socket }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState("")
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState()

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))
        setUser(userData)
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:4000/product/all")
                setProducts(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getProducts()
    }, [])

    useEffect(() => {
        let updatedProduct = []
        socket.on("bidProductResponse", (data) => {
            console.log("Socket Response")
            console.log(data)
            updatedProduct = products.map((product, index) => {
                if (product._id === data._id) {
                    return data;
                } else {
                    return product;
                }
            })
            setProducts(updatedProduct)
        })
        // console.log(updatedProduct)
        return () => {
            // setCurrentProduct(updatedProduct)
            // console.log(updatedProduct)
            socket.off("bidProductResponse")
        }
    }, [products, socket])
    return (
        <>
            <Header />
            <div className="home_container">
                {
                    products.map((product) => (
                        <div className='each_post' key={product._id}>
                            <img src={product.imgURL} alt="" width="90%" height="250" style={{
                                objectFit: "cover", padding:
                                    "1rem",
                                borderRadius: "20px"
                            }} />
                            <h3>{product.product_name}</h3>
                            <div>
                                <span>Last Bidder : {product.last_bidder_name}</span>
                                <span>Price : ₹{product.price}</span>
                            </div>
                            <div>
                                <span>Creator : {product.owner_name}</span>
                                <button onClick={() => {
                                    setIsOpen(true)
                                    setCurrentProduct(product)
                                }} >Bid</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {isOpen && <Model setIsOpen={setIsOpen} currentProduct={currentProduct} socket={socket} />}
        </>
    )
}

export default Home