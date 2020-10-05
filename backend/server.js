import express from 'express'
import dotenv from 'dotenv'

import products from './data/products.js' // files need to suffixed with .js
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const p = products.find(p1 => p1._id === req.params.id)
    res.json(p)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))