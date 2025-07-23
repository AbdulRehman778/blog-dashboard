const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalPosts = await prisma.post.count();

    res.json({ posts, totalPages: Math.ceil(totalPosts / limit) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id; 

        const newPost = await prisma.post.create({
            data: {
                title,
                body,
                authorId: userId,
            },
            include: {
                author: true,
            },
        });

        res.status(201).json({
            message: 'Post created successfully',
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
