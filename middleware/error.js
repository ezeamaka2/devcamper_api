const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // log error to developer
  // console.log(err.name);

// Mongoose bad objectID
  if(err.name === 'CastError'){
    const message = `Resource with id: ${error.value} not found`;
    error = new ErrorResponse(message, 404)
  }

  // Mongoose dublicate error
  if(err.code === 11000){
    const message = `Resource with the name: ${err.keyValue.name} already exist`;
    error = new ErrorResponse(message, 400)
  }

  // Validation Error
  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }


  res.status(error.statusCode || 500).json({success: false, error:error.message || 'Server error'})
}

module.exports = errorHandler