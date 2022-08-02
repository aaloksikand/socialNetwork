const express = require('express');
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require('mongodb').MongoClient;

const app = express();
const port = 3001;

// Connection string to local instance of MongoDB including database name
const connectionStringURI = `mongodb://127.0.0.1:27017/shelterDB`;

// Declare a variable to hold the connection
let db;

// Creates a connection to a MongoDB instance and returns the reference to the database
mongodb.connect(
  // Defines connection between app and MongoDB instance
  connectionStringURI,
  // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    // Use client.db() constructor to add new db instance
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());

app.post('/create', (req, res) => {
  // Use db connection to add a document
  db.collection('petCollection').insertOne(
    { name: req.body.name, breed: req.body.breed },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get('/read', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('petCollection')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});
// Post request to create a single document to collection
app.post('/create', (req, res) => {
  // collection() creates or selects instance of collection. Takes in collection name
  // insertOne() inserts single document into collection. Takes in object.
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author },
    // Handles error or results
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Post request to add multiple document to collection
app.post('/create-many', function (req, res) {
  db.collection('bookCollection').insertMany(
    [
      {"title" : "Oh the Places We Will Go!"},
      {"title" : "Diary of Anne Frank"}
    ], 
    (err,results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get request to read all the documents in a collection
app.get('/read', (req, res) => {
  db.collection('bookCollection')
    // find() returns all documents. Equivalent to `Select *` in SQL.
    .find({})
    // Returns all the documents in an array
    .toArray((err, results) => {
      // Handles error or results
      if (err) throw err;
      res.send(results);
    });
});

// Post request to create a single document to collection
app.post('/create', (req, res) => {
  // collection() creates or selects instance of collection. Takes in collection name
  // insertOne() inserts single document into collection. Takes in object.
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author },
    // Handles error or results
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Post request to add multiple document to collection
app.post('/create-many', function (req, res) {
  db.collection('bookCollection').insertMany(
    [
      {"title" : "Oh the Places We Will Go!"},
      {"title" : "Diary of Anne Frank"}
    ], 
    (err,results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get request to read all the documents in a collection
app.get('/read', (req, res) => {
  db.collection('bookCollection')
    // find() returns all documents. Equivalent to `Select *` in SQL.
    .find({})
    // Returns all the documents in an array
    .toArray((err, results) => {
      // Handles error or results
      if (err) throw err;
      res.send(results);
    });
});

// To delete an object, the numerical id string must be wrapped with ObjectID()
app.delete('/delete', (req, res) => {
  // Use deleteOne() to delete one object
  db.collection('bookCollection').deleteOne(
    // This is the filter. We delete only the document that matches the _id provided in the request body,
    { _id: ObjectId(req.body.id) },
    (err) => {
      if (err) throw err;
      res.send("Document deleted");
    }
  );
});