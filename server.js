const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongose = require('mongoose');

const app = express();

const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongose.connect('mongodb://localhost:27017/money-manager-db', { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Error connecting to database'));

require('./routes')(app);

app.get('/', (req,res) => {
  res.json({"message": 'Welcome to Money Manager'})
})

app.listen(port, () => console.log(`Server running on port: ${port}`));
