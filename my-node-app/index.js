const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Hello, from Docker🐳!' });
});

app.listen(PORT, () => {
  console.log(`Sun rha hoon be aa ${PORT} pe!`);
});