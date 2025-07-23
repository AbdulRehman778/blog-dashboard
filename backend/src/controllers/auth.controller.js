const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../../generated/prisma');
const { generateToken } = require('../utils/jwt.js');

const prisma = new PrismaClient();

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user);
     res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  register,
  login
};
