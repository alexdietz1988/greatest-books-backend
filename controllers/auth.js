const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/signup', async (req, res) => {
    try {
        const text = 'INSERT INTO auth(email) VALUES ($1) RETURNING *'
        const values = [req.body.email]

        const res = await db.query(text, values)
        console.log(res.rows[0])

        return res.json({ success: true })
    } catch (error) {
        console.log(error)
        req.error = error
        return res.json(error)
    }
})