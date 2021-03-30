const Course = require('../models/Course');
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')

// @desc         Get all courses
// @route       GET  /api/v1/courses
// @route       GET  /api/v1/bootcamp/:bootcampId/courses
// @access       Public 
exports.getCourses = asyncHandler (async (req, res, next) => {
  let query;

  // Check if the bootcampId exits ? return all the courses availabe in the DB
  if(req.params.bootcampId){
    query = Course.find({bootcamp: req.params.bootcampId})
  }else{
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  })
})

// @desc         Get a sing courses
// @route       GET  /api/v1/courses
// @access       Public 
exports.getCourse = asyncHandler (async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  // Check if the course if available
  if(!course){
    return next(new ErrorResponse(`Course with id: ${req.params.id} not found`, 404))
  }

  res.status(200).json({
    success: true,
    data: course
  })
})


// @desc        Add a new course
// @route       POST  /api/v1/bootcamp/:bootcampId/course
// @access      private 
exports.addCourse = asyncHandler (async (req, res, next) => {
  // Set the bootcamp id to the id in the URL
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  // Check if the course if available
  if(!bootcamp){
    return next(new ErrorResponse(`Bootcamp with id: ${req.params.bootcampId} not found`, 404))
  }
  
  // Create a new course
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  })
})

// @desc        Update a single course
// @route       PUT  /api/v1/course/id
// @access      private 
exports.updateCourse = asyncHandler (async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  // Check if the course if available
  if(!course){
    return next(new ErrorResponse(`Course with id: ${req.params.id} not found`, 404))
  }
  
  // update the course
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  })
})

// @desc        Delete a single course
// @route       DELETE  /api/v1/course/id
// @access      private 
exports.deleteCourse = asyncHandler (async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  // Check if the course if available
  if(!course){
    return next(new ErrorResponse(`Course with id: ${req.params.id} not found`, 404))
  }
  
  await course.remove()

  res.status(200).json({
    success: true,
    data: {}
  })
})