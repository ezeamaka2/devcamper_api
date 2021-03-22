const express = require('express')
const {getBootcamps, 
  getBootcamp, 
  createBootcamps, 
  updateBootcamp, 
  deleteBootcamps} = require('../controllers/bootcamps')

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


module.exports = router