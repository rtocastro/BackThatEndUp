const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = Category.findByOne(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with that ' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }
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
    })e
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
  },
  {
    // Gets the data based on paramaters
    where: {
      id: req.params.id,
    },
  }
)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
