const mongoose = require('mongoose')

connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  console.log(`connected to mongdb: ${conn.connection.host}`.blue.underline)
}

module.exports = connectDB