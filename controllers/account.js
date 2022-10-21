const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../db')

router.post('/signup', async (req, res) => {
    try {
        const checkEmail = [
            'SELECT COUNT(*) FROM account WHERE email = $1',
            [req.body.email]
        ]
        const checkEmailResponse = await db.query(...checkEmail)
        if (checkEmailResponse.rows[0].count !== '0') {
            return res.json('user already exists')
        }

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash

        const createAccount = [
            'INSERT INTO account(email, password) VALUES ($1, $2) RETURNING *',
            [req.body.email, req.body.password]
        ]
        const response = await db.query(...createAccount)
        console.log(response.rows[0])
        return res.json()
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

module.exports = router