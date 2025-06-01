const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
});


