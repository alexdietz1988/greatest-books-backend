const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/fiction', async (req, res) => {
    try {
        const response = await db.query(`SELECT * FROM book WHERE genre = 'fiction';`, [])
        return res.json(response.rows)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

router.get('/nonfiction', async (req, res) => {
    try {
        const response = await db.query(`SELECT * FROM book WHERE genre = 'nonfiction';`, [])
        return res.json(response.rows)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

module.exports = router