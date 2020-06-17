'use strict'

function errorHandler (error) {
  console.error(error)
  throw new Error('Falloe la operación del servidor')
}

module.exports= errorHandler;