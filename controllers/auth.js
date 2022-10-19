const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../db')

router.post('/signup', async (req, res) => {
    try {
        let user = req.body.user
        // const foundUser = await db.User.exists({ user })
        if (foundUser) return res.json({ success: false, error: 'user already exists' })

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash

        // await db.User.create(req.body)
        // await db.Basics.create({ user })
        return res.json({ success: true })

    } catch (error) {
        console.log(error)
        req.error = error
        return res.json(error)
    }
})