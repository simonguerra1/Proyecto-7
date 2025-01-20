const Order = require('../models/order')
const Disco = require('../models/disco')

const createOrder = async (req, res, next) => {
  try {
    const { userId, discos, status } = req.body

    let total = 0
    for (const item of discos) {
      const disco = await Disco.findById(item.discoId)
      if (!disco) {
        return res
          .status(404)
          .json({ error: `Disco con ID ${item.discoId} no encontrado` })
      }
      total += disco.price * item.quantity
    }

    const newOrder = new Order({
      userId,
      discos,
      total,
      status
    })

    const savedOrder = await newOrder.save()
    return res.status(201).json(savedOrder)
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el pedido' })
  }
}

const getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params
    const orders = await Order.find({ userId: id }).populate('discos')
    return res.status(200).json(orders)
  } catch (error) {
    console.log('El error es: ', error)
    return res.status(500).json({ error: 'Error al obtener pedidos' })
  }
}

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    return res.status(200).json(updatedOrder)
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el pedido' })
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedOrder = await Order.findByIdAndDelete(id)

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    return res.status(200).json({ message: 'Pedido eliminado', deletedOrder })
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el pedido' })
  }
}

module.exports = { createOrder, getUserOrders, updateOrderStatus, deleteOrder }
