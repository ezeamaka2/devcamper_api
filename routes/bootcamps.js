const express = require('express')
const {getBootcamps, 
  getBootcamp, 
  createBootcamps, 
  updateBootcamp, 
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps')

// Bring in the bootcamp model, since advanceResults needs it
const Bootcamp = require('../models/Bootcamp')

// Bring in advancedResults middlewear
const advancedResults = require('../middleware/advancedResults')

// Include resource router
const courseRouter = require('./courses')

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router
      .route('/')
      .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
      .post(createBootcamps)

router
      .route('/:id')
      .get(getBootcamp)
      .put(updateBootcamp)
      .delete(deleteBootcamps)

router
      .route('/radius/:zipcode/:distance')
      .get(getBootcampsInRadius)

router
      .route('/:id/photo')
      .put(bootcampPhotoUpload)


module.exports = router