// @desc         Get all bootcamps
// @method       GET  /api/v1/bootcamps
// @access       Public 
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Get all bootcamp', great: req.hello})
}

// @desc         Get a single bootcamp
// @method       GET  /api/v1/bootcamps:id
// @access       Public 
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: `Get  a bootcamp ${req.params.id}`})
}

// @desc         Create a bootcamp
// @method       POST  /api/v1/bootcamps
// @access       Private 
exports.createBootcamps = (req, res, next) => {
  res.status(200).json({success: true, msg: 'Create a bootcamp'})
}

// @desc         Get a single bootcamps
// @method       PUT  /api/v1/bootcamp
// @access       Private 
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: `Update a bootcamp ${req.params.id}`})
}

// @desc         Delete a single bootcamps
// @method       DELETE  /api/v1/bootcamp
// @access       Private 
exports.deleteBootcamps = (req, res, next) => {
  res.status(200).json({success: true,  msg: `Delete a bootcamp ${req.params.id}`})
}