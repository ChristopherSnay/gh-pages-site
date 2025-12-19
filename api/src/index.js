require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./router'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
