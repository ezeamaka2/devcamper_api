const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const color = require('colors')

// Load dotenv variables
dotenv.config({path: './config/config.env'});

// Load model
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course')

// Connect to database
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Read Json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

// Import files to database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    console.log('Data imported...'.green.inverse)
    process.exit();
  } catch (error) {
    console.log(error)
    
  }
}

// Delete data from database
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    console.log('Data destroyed...'.red.inverse)
    process.exit();
  } catch (error) {
    console.log(error)
    
  }
}

// Call import or delete
if(process.argv[2] === '-i'){
  importData();
}else if(process.argv[2] === '-d'){
  deleteData()
}