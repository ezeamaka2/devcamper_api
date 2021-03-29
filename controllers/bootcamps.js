const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')

// @desc         Get all bootcamps
// @method       GET  /api/v1/bootcamps
// @access       Public 
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // make a copy of query
  let reqQuery = { ...req.query }

  // Make an array of fields you want to remove
  // If you don't add them to the removefield and try to match
  // Them with /bootcamps?select=name, the route will return empty array.
  let removeFileds = ['select' , 'sort' , 'page', 'limit'];

  // Loop over reqQuery and remove any item in the removeField
  removeFileds.forEach(param => delete reqQuery[param])  

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if(req.query.select){
    const fields = req.query.select.split(',').join('');
    query = query.select(fields)
  }

  // Sort 
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  }else{
    query.sort('-createdAt')
  }


  const bootcamps = await query;
  
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


// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  // the latitude has to come first, I tried with the longitude coming first
  // But, was not getting any results. it returned an empty array.
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lat, lng], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});