const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // Get all books from the book table
//   Category.findAll().then((categoryData) => {
//     res.json(categoryData);
//   });
// });

router.get('/', (req, res) => {
  // find all categories and include associated Products
  Category.findAll({
    include: Product, // Include the Product model
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne(
    {
      // Gets the book based on the isbn given in the request parameters
      where: {
        id: req.params.id
      },
    }
  ).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      category_name: req.body.category_name
    },
    {
      // Gets the data based on paramaters
      where: {
        id: req.params.id,
        category_name: req.body.category_name
      },
    }
  )
    .then((updatedCategory) => {
      // Sends the updated book as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // Looks for the category based on ID given in the request parameters and deletes the instance from the database
  Category.destroy({
    where: {
      id: req.params.id,
      category_name: req.params.category_name
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
