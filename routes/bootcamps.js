const express = require('express')
const {getBootcamps, 
  getBootcamp, 
  createBootcamps, 
  updateBootcamp, 
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps')

// Include resource router
const courseRouter = require('./courses')

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router
      .route('/')
      .get(getBootcamps)
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