const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
// password check with bcrypt
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// user model to create a new user on signup
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    thoughts: {
      type: DataTypes.INTEGER,
      references: {
        model: "thought",
        key: "_id",
      },
    },
    friends: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "_id",
      },
    },
  },
  {
    // hooks: {
    //   beforeCreate: async (newUser) => {
    //     try {
    //       newUser.password = await bcrypt.hash(newUser.password, 10);
    //       return newUser;
    //     } catch (err) {
    //       console.log(err);
    //       return err;
    //     }
    //   },
    //   beforeUpdate: async (updatedUser) => {
    //     try {
    //       updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    //       return updatedUser;
    //     } catch (err) {
    //       console.log(err);
    //       return err;
    //     }
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;

// Define Mongoose
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: String,
    email: String,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    first: String,
    last: String,
    age: Number,
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    console.log(v)
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;


// Create a new instance of the Mongoose schema to define shape of each document
const grocerySchema = new mongoose.Schema({
  // Add individual properties and their types
  // Setting required to true will disallow null values
  item: { type: String, required: true },
  stockCount: Number,
  price: Number,
  inStock: Boolean,
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const Item = mongoose.model('Item', grocerySchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// We use the model to create individual documents that have the properties as defined in our schema
Item.create(
  {
    item: 'banana',
    stockCount: 10,
    price: 1,
    inStock: true,
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = Item;

// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const bookSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  title: { type: String, required: true },
  author: { type: String, required: false },
  // The type of data is set to 'String' and required is set to false, meaning it will accept null values
  publisher: String,
  stockCount: Number,
  price: Number,
  inStock: Boolean,
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Book = mongoose.model('Book', bookSchema);

const handleError = (err) => console.error(err);

// Create a new instance of the model, a document
Book.create(
  {
    title: 'Diary of Anne Frank',
    author: 'Anne Frank',
    publisher: 'Scholastic',
    stockCount: 10,
    price: 10,
    inStock: true,
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

// Create a new instance with required title and optional author properties
Book.create(
  { title: 'Oh the Places You Will Go!', author: 'Dr. Seuss' },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

// Create a new instance with only required title
Book.create({ title: 'Harold and the Purple Crayon' }, (err) =>
  err ? handleError(err) : console.log('Created new document')
);

// Will add data only if collection is empty to prevent duplicates
// Note that two documents can have the same name value
Department.find({}).exec((err, collection) => {
  if (err) {
    return handleError(err);
  }
  if (collection.length === 0) {
    return Department.insertMany(
      [
        { name: 'Produce' },
        { name: 'Dairy' },
        { name: 'Meat' },
        { name: 'Wine' },
        { name: 'Wine' },
        { name: 'Wine' },
        { name: 'Flowers' },
      ],
      (insertError) =>
        insertError ? handleError(insertError) : console.log('Inserted')
    );
  }
  return console.log('Already populated');
});

const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
});

const Genre = mongoose.model('Genre', genreSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
Genre.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Genre.insertMany(
      [
        { name: 'Kids' },
        { name: 'Kids' },
        { name: 'Kids' },
        { name: 'Romance' },
        { name: 'Mystery' },
        { name: 'Contemporary' },
        { name: 'Biography' },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

const mongoose = require('mongoose');

// Schemas define the shape of the documents within the collection.
const bookSchema = new mongoose.Schema({
  // Schemas define the properties of the document
  title: { type: String, required: true },
  author: String,
  price: { type: Number, required: true },
});

// Extend methods object with custom method
bookSchema.methods.getDiscount = function () {
  const discountPrice = this.price * 0.5;
  console.log(
    `The book's title is ${this.title} and the discounted price is ${discountPrice}`
  );
};

// Create model using mongoose.model()
const Book = mongoose.model('Book', bookSchema);

// Create new instance of model
const discountedBook = new Book({
  title: 'Oh the Places You Will Go!',
  price: 100,
});

// Call custom method on instance
discountedBook.getDiscount();

// Child documents or subdocuments can be embedded into a parent document
// the managerSchema defines the shape for manager subdocument
const managerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: Number,
});

// The employeeScheme defines the shape for the employee subdocument
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: Number,
});

// departmentSchema provides the shape of the parent document
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // This will add a single subdocument to include the manager's information
  manager: managerSchema,
  // This will include an array that holds all the employees' information
  employees: [employeeSchema],
  lastAccessed: { type: Date, default: Date.now },
});

// Uses mongoose.model() to create model
const Department = mongoose.model('Department', departmentSchema);

// Uses model to create new instance including subdocument
const managerData = { name: 'Taylor', salary: 80000 };
const employeeData = [
  { name: 'Ann', salary: 40000 },
  { name: 'Liu', salary: 50000 },
];

Department.create(
  { name: 'Shoes', manager: managerData, employees: employeeData },
  (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
  }
);

// Child documents or subdocuments can be embedded into a parent document
// The bookSchema defines the schema of the subdocument
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: Number,
});

// The librarySchema defines the schema of the parent document
const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // This will include an array that holds all the books
  books: [bookSchema],
  lastAccessed: { type: Date, default: Date.now },
});

// Uses mongoose.model() to create model
const Library = mongoose.model('Library', librarySchema);

// Uses model to create new instance including subdocument
const bookData = [
  { title: 'Diary of Anne Frank', price: 10 },
  { title: 'One Thousand Years of Solitude', price: 20 },
  { title: 'History of Hogwarts', price: 5 },
];

Library.create({ name: 'Books', books: bookData }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// Create a new instance of the Mongoose schema to define shape of each document
const grocerySchema = new mongoose.Schema({
  // Add individual properties and their types
  // Setting required to true will disallow null values
  item: { type: String, required: true },
  price: Number,
});

// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const Item = mongoose.model('Item', grocerySchema);

// Will add data only if collection is empty to prevent duplicates
Item.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Item.insertMany(
      [
        { item: 'banana', price: 1 },
        { item: 'pear', price: 2 },
        { item: 'apple', price: 3 },
        { item: 'ice cream', price: 5 },
        { item: 'bread', price: 2 },
        { item: 'cheddar cheese', price: 4 },
        { item: 'hot dogs', price: 8 },
        { item: 'lettuce', price: 2 },
        { item: 'snack cake', price: 4 },
        { item: 'wine', price: 10 },
      ],
      (insertError, insertedItems) => {
        if (insertError) {
          console.log(insertError);
        }
        console.log('Inserted items:', insertedItems);
      }
    );
  }
});

module.exports = Book;


module.exports = Genre;


// Data for document
const data = [
  // Using a reference to establish a relationship between two documents
  // This is similar to primary/foreign keys in MySQL
  {
    department: 'floral',
    promotion_id: 'flowers', // refers to the promotion object below
  },
  {
    promotion_id: 'flowers',
    sale: 'discount on red flowers',
    percentage_discount: 50,
  },

  // Using a single embedded document to create relationship
  // This is a one-to-one relationship
  {
    department: 'frozen',
    promotion: {
      promotion_id: 'popsicle',
      sale: 'discount frozen treats',
      percentage_discount: 20,
    },
  },
  {
    department: 'snacks',
    promotion: {
      promotion_id: 'chips',
      sale: 'free granola bar',
      percentage_discount: 50,
    },
  },
  // Using multiple embedded document to create a relationship to a single document
  // This is a one-to-many relationship
  {
    department: 'produce',
    promotion: [
      {
        promotion_id: 'Monday',
        sale: 'discount on bananas',
        percentage_discount: 25,
      },
      {
        promotion_id: 'Tuesday',
        sale: 'half-price apples',
        percentage_discount: 50,
      },
      {
        promotion_id: 'Wednesday',
        sale: 'discount on cherries',
        percentage_discount: 10,
      },
      {
        promotion_id: 'Thursday',
        sale: 'free grapes',
        percentage_discount: 100,
      },
      {
        promotion_id: 'Friday',
        sale: '5% off berries',
        percentage_discount: 5,
      },
      {
        promotion_id: 'Saturday',
        sale: 'discount on all fruit',
        percentage_discount: 30,
      },
      {
        promotion_id: 'Sunday',
        sale: 'discount on all fruit',
        percentage_discount: 12,
      },
    ],
  },
];

// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const bookSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  title: { type: String, required: true },
  author: { type: String, required: false },
  publisher: String,
  stockCount: Number,
  price: Number,
  inStock: Boolean,
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const Book = mongoose.model('MyBook', bookSchema);

// Create a new instance of the model, a document
Book.create([
  { title: 'Hello, World', price: 5, inStock: true },
  { title: 'Hello World 2.0', price: 10, inStock: false },
  { title: 'Hello, World 3,0', price: 7, inStock: true },
  { title: 'Hello World 4.0', price: 20, inStock: true },
  { title: 'Hello, World 5.0', price: 2, inStock: false },
  { title: 'Hello World Infinity', price: 25, inStock: false },
  { title: 'Hello World Infinity and Beyond', price: 4, inStock: true },
]);

// Data for document
const data = [
  {
    title: 'Good Omens',
    // One-to-many relationship
    // Each book has multiple authors
    authors: [
      { name: 'Neil Gaiman', featured: true },
      { name: 'Terry Pratchett', featured: true },
    ],
    information: { ISBN: 9780425132159, price: 10, total_in_stock: 10 },
  },
  {
    title: 'Heads You Lose',
    authors: [
      { name: 'Lisa Lutz', featured: false },
      { name: 'David Hayward', featured: false },
    ],
    // One-to-one embedded document relationship
    // Each book has one set of information
    information: { ISBN: 9780399157400, price: 20, total_in_stock: 8 },
  },
  {
    title: 'Between the Lines',
    authors: [
      { name: 'Jodi Picoult', featured: true },
      { name: 'Samantha Van Leer', featured: false },
    ],
    information: { ISBN: 9781451635751, price: 5, total_in_stock: 5 },
  },
];

app.use(express.json());

// Accessing embedded document with one-to-one relationship
app.get('/price-less-than-10', (req, res) => {
  db.collection('authorList')
    // Use dot notation to query on an embedded document
    .find({ 'information.price': { $lt: 10 } })
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

// Accessing embedded document with one-to-many relationship
app.get('/featured-authors', (req, res) => {
  db.collection('authorList')
    // If you do not know the array index, use dot notation to access fields nested in arrays
    .find({ 'authors.featured': true })
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
});

const Genre = mongoose.model('Genre', genreSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
Genre.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Genre.insertMany(
      [
        { name: 'Kids' },
        { name: 'Kids' },
        { name: 'Kids' },
        { name: 'Romance' },
        { name: 'Mystery' },
        { name: 'Contemporary' },
        { name: 'Biography' },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

module.exports = Genre;



module.exports = data;
