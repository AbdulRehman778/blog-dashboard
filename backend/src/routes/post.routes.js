const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller.js');
const { authenticateToken } = require('../middlewares/auth.middleware.js');

// Public routes
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// Authenticated route
router.post('/create', authenticateToken, postController.createPost);


module.exports = router;
