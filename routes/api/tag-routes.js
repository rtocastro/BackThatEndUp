const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
    {
      // Gets the book based on the isbn given in the request parameters
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
      where: {
        id: req.params.id
      },
    }
  ).then((tagData) => {
    res.json(tagData);
  });
});


router.post('/', (req, res) => {
  // create a new tag

  Tag.create({
    //include: [Product],
    id: req.body.id,
    tag_name: req.body.tag_name
  })
    .then((newTag) => {
      // Send the newly created row as a JSON object
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
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
    .then((updatedTag) => {
      // Sends the updated tag as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
console.log("delete route top level")
  Tag.destroy({
    where: {
      id: req.params.id,
      tag_name: req.params.tag_name,
      products: req.params.products
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
