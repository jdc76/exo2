const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const assert = require('assert');
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'restaurants';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  app.use(cors());

  app.get('/', function (req, res) {
    res.send('hello !')
  })

  app.get('/coucou', function (req, res) {
    res.send('je suis coucou !')
  })

  app.get('/restaurants', async function (req, res) {
    console.log("====LISTE DES RESTAURANTS====");

    const results = await db.collection("restaurants").find({}).toArray();
    res.send(results);
  });
 
  app.get('/users', async function (req, res) {
    /*console.log("====LISTE DES usersS====");*/

    const results = await db.collection("users").find({}).toArray();
    res.send(results);
  });



  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })

});
    