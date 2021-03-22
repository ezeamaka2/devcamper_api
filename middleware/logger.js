// @desc logs request to console
exports.logger = (req, res, next) => {
  req.hello = "Hello World",
  console.log(
    `${req.method}  ${req.protocol}://${req.get('host')}${req.originalUrl} - ${res.statusCode}`
  )
  next()
}
