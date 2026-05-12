const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const cors = require('cors')
const bodyparser = require("body-parser")


dotenv.config() // or import 'dotenv/config' if you're using ES6


// Connection URL
const url = 'mongodb+srv://abhileshgalande444_db_user:osdianqZxvtDW8Ke@password-manager.izgtsun.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();
  const db = client.db(dbName);

//   get all the password
app.get('/', async(req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// save a password
app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send({success: true, result:findResult})
})


// Delete a password
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.send({success: true, result:findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})