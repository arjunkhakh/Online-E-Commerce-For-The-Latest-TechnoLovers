const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find All Categories (Includes Product Data)
router.get('/', async (req, res) => {
  try {
    const userData = await Category.findAll({
      include: [{ model: Product }]
  });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// Find One Category By Its `id` Value (Includes Products Data)
router.get('/:id', async (req, res) => {
  try {
    const userData = await Category.findByPk(req.params.id,{
      include: [{ model: Product }]
  });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// Create A New Category
router.post('/', async (req, res) => {
  try {
    const userData = await Category.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update A Category By Its `id` Value
router.put('/:id', async (req, res) => {
  try {
    const userData = await Category.update(req.body, {
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

// Delete A Category By It's `id` Value
router.delete('/:id', async (req, res) => {
  try {
    const userData = await Category.destroy({
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
