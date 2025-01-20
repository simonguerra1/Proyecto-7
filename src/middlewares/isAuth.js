const { veryfiyJwt } = require('../config/jwt')
const User = require('../api/models/user')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('No estas autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = veryfiyJwt(parsedToken)
    const user = await User.findById(id)

    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json(error)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('No estas autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = veryfiyJwt(parsedToken)
    const user = await User.findById(id)

    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('Esta accion solo la pueden hacer los administradores')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { isAuth, isAdmin }
