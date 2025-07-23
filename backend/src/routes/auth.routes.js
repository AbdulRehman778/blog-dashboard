const express = require('express');
const { register, login } = require('../controllers/auth.controller.js');
const { authenticateToken } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, async (req, res) => {
  res.status(200).json({ message: 'Welcome!', user: req.user });
});


module.exports = router;
