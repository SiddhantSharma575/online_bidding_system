const router = require("express").Router()
const Product = require("../model/Product")

router.post("/add", async (req, res) => {
    const { product_name, price, owner_name, last_bidder_name, owner_id, last_bidder_id, imgURL } = req.body
    try {
        const response = await Product.create({
            product_name,
            price,
            owner_name,
            last_bidder_name,
            owner_id,
            last_bidder_id,
            imgURL
        })
        return res.json(response)
    } catch (error) {
        console.log(error)
    }
})

router.get("/all", async (req, res) => {
    try {
        const response = await Product.find()
        return res.json(response)
    } catch (error) {
        console.log(error)
    }
})

router.get("/getOne/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return res.json(product)
    } catch (error) {
        console.log(error)
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const UpdatedDoc = await Product.findByIdAndUpdate(req.params.id, {
            last_bidder_name: req.body.last_bidder_name,
            last_bidder_id: req.body.last_bidder_id,
            price: req.body.price
        }, (err, docs) => {
            if (err) {
                console.log(err)
            }
            return res.json(docs)
        })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router