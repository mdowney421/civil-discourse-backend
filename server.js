// DEPENDENCIES
const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')
const request = require('request')
const NewsAPI = require('newsapi')
const pool = require('./db')
require('dotenv').config()
const app = express()


// ENV VARIABLES
const PORT = process.env.PORT || 3003
const API_KEY = process.env.API_KEY
const newsapi = new NewsAPI(process.env.API_KEY)

// MIDDLEWARE
app.use(cors())
app.use(express.json())


// RESTful ROUTES FOR USER ACCOUNTS

// create new user
app.post('/users', async(req, res) => {
    try {
        const {username, password} = req.body
        const newUser = await pool.query('INSERT INTO useraccounts (username, password) VALUES($1, $2) RETURNING *', [username, password])
        res.json(newUser.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// get all users
app.get('/users', async(req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM useraccounts')
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get specific user by username
app.get('/users/:id', async(req, res) => {
    try {
        const {id} = req.params
        const user = await pool.query('SELECT * FROM useraccounts WHERE username = $1', [id])
        res.json(user.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// edit specific user by username
app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {username, password} = req.body
        const updatedUser = await pool.query('UPDATE useraccounts SET username = $1, password = $2 WHERE username = $3', [username, password, id])
        res.json('Username was updated')
    } catch (error) {
        console.error(error.message)
    }
})

// delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await pool.query('DELETE FROM useraccounts WHERE user_id = $1', [id])
        res.json('User was deleted')
    } catch (error) {
        console.error(error.message)
    }
})


// RESTful ROUTES FOR ARTICLES

// create new article
app.post('/articles', async(req, res) => {
    try {
        const {title, description, image, url, date, likes, dislikes, comments} = req.body
        const newArticle = await pool.query('INSERT INTO articles (title, description, image, url, date, likes, dislikes, comments) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [title, description, image, url, date, likes, dislikes, comments])
        res.json(newArticle.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// get all articles
app.get('/articles', async(req, res) => {
    try {
        const allArticles = await pool.query('SELECT * FROM articles ORDER BY article_id DESC')
        res.json(allArticles.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get specific article by title
app.get('/articles/:id', async(req, res) => {
    try {
        const {id} = req.params
        const article = await pool.query('SELECT * FROM articles WHERE date = $1', [id])
        res.json(article.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// edit specific article by article date
app.put('/articles/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {title, description, image, url, date, likes, dislikes, comments} = req.body
        const updatedArticle = await pool.query('UPDATE articles SET title = $1, description = $2, image = $3, url = $4, date = $5, likes = $6, dislikes = $7, comments = $8 WHERE date = $9', [title, description, image, url, date, likes, dislikes, comments, id])
        res.json('Article was updated')
    } catch (error) {
        console.error(error.message)
    }
})

// delete a user
app.delete('/articles/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deletedArticle = await pool.query('DELETE FROM articles WHERE date = $1', [id])
        res.json('Article was deleted')
    } catch (error) {
        console.error(error.message)
    }
})


// API ROUTES
app.get('/api/top_headlines', (req, res) => {
    newsapi.v2.topHeadlines({
        language: 'en',
        country: 'us'
    }).then(response => {
        res.json(response)
    })
    // request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`, (error, body) => {
    //     res.json(body)
    // })
})


// LISTENER
app.listen(PORT, () => console.log('Listening on port: ', PORT))