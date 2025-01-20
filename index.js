require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const usersRoutes = require('./src/api/routes/user')
const discosRouter = require('./src/api/routes/disco')
const ordersRouter = require('./src/api/routes/order')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/discos', discosRouter)
app.use('/api/v1/orders', ordersRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('El servidor esta funcionando en: http://localhost:3000')
})
