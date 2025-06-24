const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next(); // move on to the next middleware/route
};

module.exports = logger;
