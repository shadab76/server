
const express = require('express')
const app = express()
const cors = require('cors')
const mongooes = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

// mongooes.connect('mongodb://localhost:27017/mern-stack-app')
mongooes.connect(`mongodb+srv://Ragisterapp:shadab123@cluster0.71hkugq.mongodb.net/Collection?retryWrites=true&w=majority`)

app.use(cors())
app.use(express.json())

app.use(
    express.urlencoded({ extended: true })
);

app.post('/api/signup', async (req, res) => {
    console.log(req.body, 'line15')
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'Ok' })
    } catch (err) {
        res.json({ statue: 'error', error: err })
    }
})


app.post('/api/login', async (req, res) => {

    try {
        console.log("line no 35", req.body)
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })

        console.log("line no 41", user)
        if (user) {

            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secret123')

            console.log(token, "line42")

            return res.json({ status: 'Ok', user: token })
        }
        else if (!user) {
            res.send("user not found")
        }
    }
    catch (error) {
        console.log(error)
        return res.json({ status: error, user: false })

    }

})

app.listen(1337, () => {
    console.log("server started on 1337")
})