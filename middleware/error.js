const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // log error to developer
  console.log(err.stack.red);

// Mongoose bad objectID
  if(err.name === 'CastError'){
    const message = `Resource with id: ${error.value} not found`;
    error = new ErrorResponse(message, 404)
  }
  res.status(error.statusCode || 500).json({success: false, error:error.message || 'Server error'})
}

module.exports = errorHandler