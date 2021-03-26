const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')


// @desc         Get all bootcamps
// @method       GET  /api/v1/bootcamps
// @access       Public 
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({bootcamps: bootcamps.length, success: true, msg: bootcamps})
})

// @desc         Get a single bootcamp
// @method       GET  /api/v1/bootcamps:id
// @access       Public 
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
    }
    res.status(200).json({success: true, msg: bootcamp})
})

// @desc         Create a bootcamp
// @method       POST  /api/v1/bootcamps
// @access       Private 
exports.createBootcamps = asyncHandler(async(req, res, next) => {
    const bootcamp =  await Bootcamp.create(req.body)
    res.status(201).json({success: true, msg: bootcamp}) 
})

// @desc         Get a single bootcamps
// @method       PUT  /api/v1/bootcamp
// @access       Private 
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    })

    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
    }

    res.status(200).json({success: true, msg: bootcamp})
})

// @desc         Delete a single bootcamps
// @method       DELETE  /api/v1/bootcamp
// @access       Private 
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
    }
    res.status(200).json({success: true, msg: 'Bootcamp deleted'})
})