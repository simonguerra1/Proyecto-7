const {
  createOrder,
  deleteOrder,
  getUserOrders,
  updateOrderStatus
} = require('../controllers/order')
const { isAuth } = require('../../middlewares/isAuth')

const ordersRouter = require('express').Router()

ordersRouter.get('/:id', getUserOrders)
ordersRouter.post('/', createOrder)
ordersRouter.delete('/:id', [isAuth], deleteOrder)
ordersRouter.put('/:id', updateOrderStatus)

module.exports = ordersRouter
