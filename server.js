const express = require('express');
const app = express();
const logger = require('./middleware/logger');
app.use(logger);
const PORT = 3000;



const productsRouter = require('./routes/products'); // 👈 this must be correct
app.use(express.json()); // 👈 this is what enables the route

app.get('/', (req, res) => {
  res.send('Hello Express.js!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});



