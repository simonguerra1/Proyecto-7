const Disco = require('../models/disco')

const getDiscos = async (req, res, next) => {
  try {
    const discos = await Disco.find()
    return res.status(200).json(discos)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const getDisco = async (req, res, next) => {
  try {
    const { id } = req.params
    const disco = await Disco.findById(id)
    return res.status(200).json(disco)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error')
  }
}

const postDisco = async (req, res, next) => {
  try {
    const newDisco = new Disco(req.body)
    const discoSaved = await newDisco.save()
    return res.status(201).json(discoSaved)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const updateDisco = async (req, res, next) => {
  try {
    const { id } = req.params

    const newDisco = new Disco(req.body)

    newDisco._id = id

    const discoUpdated = await Disco.findByIdAndUpdate(id, newDisco, {
      new: true
    })

    return res.status(200).json(discoUpdated)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deleteDisco = async (req, res, next) => {
  try {
    const { id } = req.params
    const discoDeleted = await Disco.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Elemento Eliminado',
      elemento: discoDeleted
    })
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  getDiscos,
  postDisco,
  updateDisco,
  deleteDisco,
  getDisco
}
