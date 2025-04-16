const User = require('../models/User');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user), user });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário', details: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.json({ token: generateToken(user), user });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
