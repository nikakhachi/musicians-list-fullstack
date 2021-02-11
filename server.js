const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let list = [];

app.get('/api/rockers', (req, res) => {
  res.json(list);
});

app.post('/api/rockers', (req, res) => {
  list = list.concat(req.body);
  res.json(list);
});

app.delete(`/api/rockers/:id`, (req, res) => {
  let deletedObject = list.find(item => item.id === req.params.id);
  list.splice(list.indexOf(deletedObject), 1);
  res.json(list);
}) 

app.listen(5000, () => console.log(`starting on PORT : 5000`));