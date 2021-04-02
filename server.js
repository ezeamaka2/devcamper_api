const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const fileUpload = require('express-fileupload')

// bring in error handler
const errorHandler = require('./middleware/error')

// Dotenv config setup
dotenv.config({path: './config/config.env'})

// Connect to DB
connectDB()
// Routes files
const bootcampRoute = require('./routes/bootcamps')
const courseRoute = require('./routes/courses')
const authRoute = require('./routes/auth')


const app = express()

// Body parser
app.use(express.json())

//Dev logging middlewear
if(process.env.NODE_ENV === 'Developement'){
  app.use(morgan('dev'))
}

// Fileupload
app.use(fileUpload())

// Set the public folder as a static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount route files
app.use('/api/v1/bootcamps', bootcampRoute)
app.use('/api/v1/courses', courseRoute)
app.use('/api/v1/auth', authRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.blue.bold)
})

// Handle unhandled rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server and exit()
    server.close(() => process.exit(1))
  })


