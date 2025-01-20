const { isAdmin } = require('../../middlewares/isAuth')
const {
  getDiscos,
  postDisco,
  updateDisco,
  deleteDisco,
  getDisco
} = require('../controllers/disco')

const discosRouter = require('express').Router()

discosRouter.get('/', getDiscos)
discosRouter.post('/', [isAdmin], postDisco)
discosRouter.put('/:id', [isAdmin], updateDisco)
discosRouter.delete('/:id', [isAdmin], deleteDisco)
discosRouter.get('/:id', getDisco)

module.exports = discosRouter
