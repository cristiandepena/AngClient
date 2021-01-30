// Modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

const mongoose = require('mongoose');

// Mongoose model
const Client = require('../models/client');

// Database init
mongoose.connect('mongodb://localhost:27017/clientdb').then(() => {
  console.log('Connected to DB');
}).catch(()=>{
  console.log('Connection Failed');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Avoid CORS errors
app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ');
  next();
});

// Create new client
app.post('/api/clients', (req, res, next)=> {

  const client = new Client({
    name: req.body.name
  });

  client.addresses.push(req.body.addresses);

  client.save().then(newClient => {

    res.status(201).json({
      message: 'Client added',
      clientId: newClient._id
    });
  });
});

// Update a client
app.put('/api/clients/:id', (req, res, next)=> {
  const client = new Client({
    _id: req.body.id,
    name: req.body.name
  });

  client.addresses.push(req.body.addresses);

  Client.updateOne({_id: req.params.id}, client).then( result => {
    console.log(result);
  });
})

// Get all clients
app.get('/api/clients', (req, res, next)=> {
  Client.find().then( documents=> {
    console.log(documents);
    res.json({
      message: 'Client fetched successfully',
      clients: documents
    });
  });

});

// Delete client
app.delete('/api/clients/:id', (req, res, next) => {

  Client.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Client deleted'
    });
  });
});

// Default route
app.get('/', (req, res, next) => {
    res.send('Working');
});
// Server
app.listen(port, (err) => {
    if (err) {
        console.log('Unable to start server');
    }

    console.log(`Server running at localhost:${port}`);
});

