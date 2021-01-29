const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ');
  next();
});

app.post('/api/clients', (req, res, next)=> {
  const client = req.body;
  console.log(client);
  res.status(201).json({
    message: 'Client added'
  });
});

app.use('/api/clients', (req, res, next)=> {
  const clients = [
  {
    id: '21345423',
    name: 'Juan Perez',
    addres: 'close'
  },
  {
    id: '549656',
    name: 'Cristian Andres',
    addres: 'Av. Libertad #13'
  }
];
 res.json({
   message: 'Client fetched successfully',
   clients: clients
 });
});

app.get('/', (req, res, next) => {
    res.send('Hola');
});

app.listen(port, (err) => {
    if (err) {
        console.log('Unable to start server');
    }

    console.log(`Server running at localhost:${port}`);
});

