const express = require('express');
const app = express();

app.use('/api', require('./router'));

app.listen(3001, () => {
  console.log('API server is running on http://localhost:3001');
});
