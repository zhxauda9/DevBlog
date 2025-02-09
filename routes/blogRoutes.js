const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// 📌 Создание блога (POST /blogs)
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

// 📌 Получение всех блогов (GET /blogs)
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

// 📌 Получение одного блога по ID (GET /blogs/:id)
router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Блог не найден" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
});

// 📌 Обновление блога (PUT /blogs/:id)
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

// 📌 Удаление блога (DELETE /blogs/:id)
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
