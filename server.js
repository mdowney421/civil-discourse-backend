// DEPENDENCIES
const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')
const request = require('request')
const pool = require('./db')
require('dotenv').config()
const app = express()


// ENV VARIABLES
const PORT = process.env.PORT || 3003
const API_KEY = process.env.API_KEY


// MIDDLEWARE
app.use(cors())
app.use(express.json())


// RESTful ROUTES
app.post('/users', async(req, res) => {
    try {
        const {username, password} = req.body
        const newUser = await pool.query('INSERT INTO useraccounts (username, password) VALUES($1, $2) RETURNING *', [username, password])
        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/users', async(req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM useraccounts')
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const {id} = req.params
        const user = await pool.query('SELECT * FROM useraccounts WHERE user_id = $1', [id])
        res.json(user.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {username, password} = req.body
        const updatedUser = await pool.query('UPDATE useraccounts SET username = $1, password = $2 WHERE user_id = $3', [username, password, id])
        res.json('Username was updated')
    } catch (error) {
        console.error(error.message)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await pool.query('DELETE FROM useraccounts WHERE user_id = $1', [id])
        res.json('User was deleted')
    } catch (error) {
        console.error(error.message)
    }
})

// API ROUTES
app.get('/api/top_headlines', (req, res) => {
    request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`, (error, body) => {
        res.json(body)
    })
})


// LISTENER
app.listen(PORT, () => console.log('Listening on port: ', PORT))