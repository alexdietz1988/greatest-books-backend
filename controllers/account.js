const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../db')

const checkForUser = async (email) => {
    const response = await db.query(
        'SELECT COUNT(*) FROM account WHERE email = $1',
        [email]
    )
    return response.rows[0].count !== '0'
} 

router.post('/signup', async (req, res) => {
    try {
        const userExists = await checkForUser(req.body.email)
        if (userExists) {
            return res.json('user already exists')
        }

        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash
        const createAccount = await db.query(
            'INSERT INTO account(email, password) VALUES ($1, $2) RETURNING *',
            [req.body.email, req.body.password]
        )
        console.log(createAccount.rows[0])
        return res.json()
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userExists = await checkForUser(req.body.email)
        if (!userExists) {
            return res.json('invalid email or password')
        }

        const foundUser = await db.query(
            'SELECT * FROM account WHERE email = $1',
            [req.body.email]
        )
        console.log(foundUser.rows[0])
        const match = await bcrypt.compare(
            req.body.password,
            foundUser.rows[0].password
        )
        if (!match) {
            return res.json('invalid email or password')
        }
        return res.json()
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

module.exports = router