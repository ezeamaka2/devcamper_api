const path = require('path')
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')


// @desc         Register a new user
// @route       POST  /api/v1/auth/register
// @access       Public 

exports.register = asyncHandler( async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'Registered'
  })
})