const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [

      Category, // Include the Category model
    
      {
        model: Tag, // Include the Tag model
        through: ProductTag, // If there is a many-to-many association with Product and Tag
      },
    ],
  })
    .then((productData) => {
      res.json(productData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne(
    {
      // Gets id  based on the id given in the request parameters
      where: {
        id: req.params.id
      },
    }
  ).then((productData) => {
    res.json(productData);
  });
});
// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    Product.create({
      id: req.body.id,
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock
    })
      .then((newProduct) => {
        // Send the newly created row as a JSON object
        res.json(newProduct);
      })
      .catch((err) => {
        res.json(err);
      });
  });

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  // Looks for the category based on ID given in the request parameters and deletes the instance from the database
  Product.destroy({
    where: {
      id: req.params.id,
      product_name: req.params.product_name,
      price: req.params.price,
      stock: req.params.stock,
      category_id: req.params.category_id
    },
  })
    .then((deletedProduct) => {
      res.json(deletedProduct);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
