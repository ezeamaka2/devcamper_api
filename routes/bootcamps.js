const express = require('express')
const {getBootcamps, 
  getBootcamp, 
  createBootcamps, 
  updateBootcamp, 
  deleteBootcamps,
  getBootcampsInRadius
} = require('../controllers/bootcamps')

const router = express.Router();

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


module.exports = router