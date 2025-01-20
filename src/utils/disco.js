const mongoose = require('mongoose')

const Disco = require('../api/models/disco')
const discos = require('../data/discos')

const lanzarSemilla = async () => {
  try {
    mongoose.connect(
      'mongodb+srv://simonguerradev:aT3LdFVHM777GE9z@cluster0.xs3cf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )

    await Disco.collection.drop()
    console.log('Discos eliminados')

    await Disco.insertMany(discos)
    console.log('Discos introducidos')

    await mongoose.disconnect()
    console.log('Desconectados de la BBDD')
  } catch (error) {
    console.log('error')
  }
}

lanzarSemilla()
