const express = require('express');
const Blog = require('../models/blog');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../web', 'index.html'));
});

router.post('/blogs', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: "Заголовок и тело обязательны" });
        }

        const blog = new Blog({ title, body, author });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

// ✅ GET /api/blogs/:id → Получить один блог
router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Блог не найден" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

// ✅ PUT /api/blogs/:id → Обновить блог
router.put('/blogs/:id', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, body, author }, { new: true });

        if (!updatedBlog) return res.status(404).json({ message: "Блог не найден" });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ message: "Блог не найден" });

        res.json({ message: "Блог удален" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

module.exports = router;
