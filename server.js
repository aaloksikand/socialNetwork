const express = require('express');
const db = require('./config/connection');
// Require model
const { Book } = require('./models');
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// GET request to read all the documents in a collection
app.get('/read', (req, res) => {
  db.collection('letterList')
    // find() returns all documents. Equivalent to `Select *` in SQL.
    .find()
    // sort() sorts in ascending or descending order
    .sort({ letter: 1 })
    // skips first returned document
    .skip(1)
    // limits returns to 10
    .limit(10)
    .toArray((err, results) => {
      // Handles error or results
      if (err) throw err;
      res.send(results);
    });
});
// Get request to read all the documents in a collection
app.get('/read', (req, res) => {
  db.collection('numberList')
    // find() returns all documents. Equivalent to `Select *` in SQL.
    .find()
    .sort({ number: -1 })
    .skip(5)
    .limit(5)
    .toArray((err, results) => {
      // Handles error or results
      if (err) throw err;
      res.send(results);
    });
});

app.get('/all-items', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Item.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Creates a new department
app.post('/new-department/:department', (req, res) => {
  const newDepartment = new Department({ name: req.params.department });
  newDepartment.save();
  if (newDepartment) {
    res.status(201).json(newDepartment);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds all departments
app.get('/all-departments', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Department.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds the first matching document
app.get('/find-wine-department', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Department.findOne({ name: 'Wine' }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds first document matching parameter and deletes
// For demo, use 'Wine' as URL param
app.delete('/find-one-delete/:departmentName', (req, res) => {
  Department.findOneAndDelete(
    { name: req.params.departmentName },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

// Creates a new document
app.post('/new-genre/:genre', (req, res) => {
  const newGenre = new Genre({ name: req.params.genre });
  newGenre.save();
  if (newGenre) {
    res.status(200).json(newGenre);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});

// Finds all documents
app.get('/all-genres', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Genre.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Find first document with name equal to "Kids"
app.get('/find-kids-genre', (req, res) => {
  Genre.findOne({ name: 'Kids' }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Finds first document that matches and deletes
app.delete('/find-one-delete/:genre', (req, res) => {
  Genre.findOneAndDelete({ name: req.params.genre }, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Finds the first document with the name with the value equal to 'Kids' and updates that name to the provided URL param value
app.post('/find-one-update/:genre', (req, res) => {
  // Uses findOneAndUpdate() method on model
  Genre.findOneAndUpdate(
    // Finds first document with name of "Kids"
    { name: 'Kids' },
    // Replaces name with value in URL param
    { name: req.params.genre },
    // Sets to true so updated document is returned; Otherwise original document will be returned
    { new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    }
  );
});
// Finds all books
app.get('/all-books', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Library.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(result);
  });
});

app.get('/sum-price', (req, res) => {
  // Call aggregate() on model
  Item.aggregate(
    [
      // Where prices are less or equal to 5
      { $match: { price: { $lte: 5 } } },
      {
        $group: {
          // Group by null (no additional grouping by id)
          _id: null,
          // Sum of all prices
          sum_price: { $sum: '$price' },
          // Average of all prices
          avg_price: { $avg: '$price' },
          // Maximum price
          max_price: { $max: '$price' },
          // Minimum price
          min_price: { $min: '$price' },
        },
      },
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
});
// Get Aggregate Functions
app.get('/sum-price', (req, res) => {
  // Call aggregate() on model
  Book.aggregate(
    [
      // Filter books that are in stock
      { $match: { inStock: true } },
      {
        $group: {
          // Group by null (no additional grouping by id)
          _id: null,
          // Sum of all prices
          sum_price: { $sum: '$price' },
          // Average of all prices
          avg_price: { $avg: '$price' },
          // Maximum price
          max_price: { $max: '$price' },
          // Minimum price
          min_price: { $min: '$price' },
        }
      },
    ],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});