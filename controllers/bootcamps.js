const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')


// @desc         Get all bootcamps
// @method       GET  /api/v1/bootcamps
// @access       Public 
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({bootcamps: bootcamps.length, success: true, msg: bootcamps})
  } catch (err) {
    next(err)
  }
}

// @desc         Get a single bootcamp
// @method       GET  /api/v1/bootcamps:id
// @access       Public 
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
    }
    res.status(200).json({success: true, msg: bootcamp})
  } catch (err) {
    // res.status(400).json({success: false})
    next(err)
  }
}

// @desc         Create a bootcamp
// @method       POST  /api/v1/bootcamps
// @access       Private 
exports.createBootcamps = async(req, res, next) => {
  try {
    const bootcamp =  await Bootcamp.create(req.body)
    res.status(201).json({success: true, msg: bootcamp})
  } catch (error) {
    next(err)
    
  }
 
}

// @desc         Get a single bootcamps
// @method       PUT  /api/v1/bootcamp
// @access       Private 
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    })

    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
    }

    res.status(200).json({success: true, msg: bootcamp})
  } catch (err) {
    next(err)
    
  }
}

// @desc         Delete a single bootcamps
// @method       DELETE  /api/v1/bootcamp
// @access       Private 
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!bootcamp){
      return next(new ErrorResponse(`Bootcamp with id: ${req.params.id} not found`, 404))
    }
    res.status(200).json({success: true, msg: 'Bootcamp deleted'})
  } catch (err) {
    next(err)
  }

}