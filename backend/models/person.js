const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// Schema define la estructura de los documentos
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
    trim: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d+$/.test(value)
      },
      message: props => `${props.value} is not a valid phone number format`
    }
  }
})

// Transforma _id de MongoDB a id sin guion bajo
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Exporta el modelo (interfaz para la colección 'people')
module.exports = mongoose.model('Person', personSchema)
