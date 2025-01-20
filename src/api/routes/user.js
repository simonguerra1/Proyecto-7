const { isAuth, isAdmin } = require('../../middlewares/isAuth')
const {
  register,
  registerAdmin,
  login,
  deleteUser,
  getUsers,
  getUser,
  updateUser
} = require('../controllers/user')

const usersRoutes = require('express').Router()

usersRoutes.get('/', [isAdmin], getUsers)
usersRoutes.post('/register', register)
usersRoutes.post('/register-admin', [isAuth, isAdmin], registerAdmin)
usersRoutes.post('/login', login)
usersRoutes.delete('/:id', [isAuth], deleteUser)
usersRoutes.get('/:id', getUser)
usersRoutes.put('/:id', [isAdmin], updateUser)

module.exports = usersRoutes
