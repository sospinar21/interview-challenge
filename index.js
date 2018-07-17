const express = require('express');
const app = express();

const db = require('./db/db');
app.use(express.static('public'));

app.get('/data', (req, res) => {
  res.json(JSON.parse(JSON.stringify(db)))
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
