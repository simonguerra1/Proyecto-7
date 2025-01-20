const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateSign } = require('../../config/jwt')

const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      console.log('Campos faltantes:', { userName, password })
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const userDuplicated = await User.findOne({ userName })
    console.log('Usuario duplicado:', userDuplicated)

    if (userDuplicated) {
      return res.status(400).json({ error: 'Ese nombre de usuario ya existe' })
    }

    const newUser = new User({ userName, password, rol: 'user' })
    console.log('Usuario creado antes de guardar:', newUser)

    const userSaved = await newUser.save()
    console.log('Usuario guardado:', userSaved)

    return res.status(201).json(userSaved)
  } catch (error) {
    console.log('Error en register:', error)
    return res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}

const registerAdmin = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const userDuplicated = await User.findOne({ userName })

    if (userDuplicated) {
      return res.status(400).json({ error: 'Ese nombre de usuario ya existe' })
    }

    const newAdmin = new User({ userName, password, rol: 'admin' })

    const adminSaved = await newAdmin.save()

    return res.status(201).json(adminSaved)
  } catch (error) {
    console.log('Error en registerAdmin:', error)
    return res
      .status(500)
      .json({ error: 'Error al registrar el administrador' })
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
        return res.status(200).json({ user, token })
      }
    } else {
      return res.status(400).json('El usuario o la contraseña son incorrectos')
    }
  } catch (error) {
    console.error('Error en login:', error)

    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const requestingUser = req.user

    if (requestingUser.rol !== 'admin' && requestingUser.id !== id) {
      return res.status(403).json({
        message: 'No tienes autorización para eliminar este usuario'
      })
    }

    const userDeleted = await User.findByIdAndDelete(id)

    if (!userDeleted) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }

    return res.status(200).json({
      message: 'Usuario eliminado con éxito',
      userDeleted
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error interno del servidor',
      error
    })
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('discos')
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const { userName, password, rol } = req.body

    const requestUser = req.user

    const updateData = {}
    if (userName) updateData.userName = userName
    if (password) updateData.password = password.bcrypt.hashSync(password, 10)

    if (rol && requestUser.rol === 'admin') {
      updateData.rol = rol
    }

    const userUpdated = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })

    return res.status(200).json(userUpdated)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al actualizar el usuario')
  }
}

module.exports = {
  register,
  registerAdmin,
  login,
  deleteUser,
  getUsers,
  getUser,
  updateUser
}
