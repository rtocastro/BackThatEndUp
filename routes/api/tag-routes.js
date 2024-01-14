const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  router.get('/', (req, res) => {
    Tag.findAll({
      include: Product, // Include the Product model
    })
      .then((tagData) => {
        res.json(tagData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singletag = Tag.findByOne(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag with that id ' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag

  Tag.create({
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

  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
