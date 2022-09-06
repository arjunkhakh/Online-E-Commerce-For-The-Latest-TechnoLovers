const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find All Tags (Includes Product Data)
router.get('/', async (req, res) => {
  try {
    const userData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
  });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// Find A Single Tag By Its `id`
router.get('/:id', async (req, res) => {
  try {
    const userData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!userData) {
      res.status(404).json({ message: "No product data found with that id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create A New Tag
router.post('/', async (req, res) => {
  try {
    const userData = await Tag.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update A Tag's Name By Its `id` Value
router.put('/:id', async (req, res) => {
  try {
    const userData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete On Tag By Its `id` Value
router.delete('/:id', async (req, res) => {
  try {
    const userData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
