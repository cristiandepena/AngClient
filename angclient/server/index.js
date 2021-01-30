const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const Client = require('../models/client');

mongoose.connect('mongodb://localhost:27017/clientdb').then(() => {
  console.log('Connected to DB');
}).catch(()=>{
  console.log('Connection Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ');
  next();
});

app.post('/api/clients', (req, res, next)=> {

  const client = new Client({
    name: req.body.name
  });

  client.addresses.push(req.body.addresses);
  console.log('el client', client);

  client.save().then(newClient => {

    res.status(201).json({
      message: 'Client added',
      clientId: newClient._id
    });
  });


});

app.get('/api/clients', (req, res, next)=> {
  Client.find().then( documents=> {
    console.log(documents);
    res.json({
      message: 'Client fetched successfully',
      clients: documents
    });
  });

});

app.delete('/api/clients/:id', (req, res, next) => {

  Client.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Client deleted'
    });
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

