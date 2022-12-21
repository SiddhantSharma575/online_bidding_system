const router = require("express").Router()
const User = require("../model/User")
const bcryptJs = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    const { username, password: plainTextPassword, email } = req.body;
    if (!username || !plainTextPassword || !email) {
        return res.json({
            status: "Error",
            error: "Invalid Username or password or email"
        })
    }
    const password = await bcryptJs.hash(plainTextPassword, 10)
    try {
        const resp = await User.create({
            username,
            password,
            email
        })
        return res.json({
            status: "success"
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.json({
                status: "error",
                error: "Username or email already in use"
            })
        }
        return res.json({
            status: "Error"
        })
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean()
    if (!user) {
        return res.json({ status: "Error", "Error": "Invalid Username" })
    }
    if (await bcryptJs.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            username: username
        }, process.env.JWT_SECRET)
        return res.json({ status: "Success", user })
    }
})



module.exports = router