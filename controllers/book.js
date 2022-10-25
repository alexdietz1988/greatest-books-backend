const express = require('express')
const router = express.Router()
const db = require('../db')

// Get all books of specified genre and date range
router.post('/', async (req, res) => {
    try {
        const values = [
            req.body.genre,
            req.body.dates.start,
            req.body.dates.end
        ]
        let query = `SELECT * FROM book WHERE genre = $1 AND publication_date BETWEEN CAST($2 AS SMALLINT) AND CAST($3 AS SMALLINT)`

        if (req.body.author !== '') {
            values.push(req.body.author)
            query += ' AND author = $4'
        }

        if (req.body.queryString !== '') {
            values.push(req.body.queryString)
            query += `AND title ILIKE %$${values.length}% OR author ILIKE %$${values.length}%`
        }

        query += ' LIMIT 100;'

        const response = await db.query(query, values)
        return res.json(response.rows)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})



module.exports = router