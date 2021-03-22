const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')

// Routes files
const bootcampRoute = require('./routes/bootcamps')


// Dotenv config setup
dotenv.config({path: './config/config.env'})
const app = express()

//Dev logging middlewear
if(process.env.NODE_ENV === 'Developement'){
  app.use(morgan('dev'))
}

// Mount route files
app.use('/api/v1/bootcamps', bootcampRoute)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
})