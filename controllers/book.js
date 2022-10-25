const express = require('express')
const router = express.Router()
const db = require('../db')

// Get all books of specified genre and date range
router.get('/', async (req, res) => {
    try {
        const response = await db.query(
            `SELECT * FROM book WHERE genre = $1 AND publication_date BETWEEN CAST($2 AS SMALLINT) AND CAST($3 AS SMALLINT);`,
            [req.body.genre, req.body.start, req.body.end]
        )
        return res.json(response.rows)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})



module.exports = router