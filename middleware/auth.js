// middleware/auth.js
const API_KEY = 'mysecretapikey'; 

const authenticate = (req, res, next) => {
  const userKey = req.headers['x-api-key'];

  if (!userKey || userKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }

  next(); // key is valid — let request continue
};

module.exports = authenticate;
