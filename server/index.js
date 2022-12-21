const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
require("dotenv").config();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');
const Authrouter = require("./routes/Auth");
const ProductRouter = require("./routes/product")
const Product = require("./model/Product")
const socketIO = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})


app.use(cors())
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected")
})


app.use("/auth", Authrouter)
app.use("/product", ProductRouter)

socketIO.on("connection", (socket) => {
    console.log(`${socket.id} user connected`);
    socket.on("disconnect", () => {
        console.log("A user disconnected")
    })

    socket.on("addProduct", async (data) => {
        const response = await Product.create({
            product_name: data.product_name,
            price: data.price,
            owner_name: data.owner_name,
            last_bidder_name: data.last_bidder_name,
            owner_id: data.owner_id,
            last_bidder_id: data.last_bidder_id,
            imgURL: data.imgURL
        })
        console.log(data)
        socket.broadcast.emit("addProductResponse", response)
    })


    socket.on("bidProduct", (data) => {
        Product.findByIdAndUpdate(data.current_product_id, {
            last_bidder_name: data.last_bidder_name,
            last_bidder_id: data.last_bidder_id,
            price: data.price
        }, { new: true }, function (err, docs) {
            socketIO.sockets.emit("bidProductResponse", docs)
        })

    })

})

http.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})