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


module.exports = data;
