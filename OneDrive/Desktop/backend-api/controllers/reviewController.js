const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar avaliação' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
};
