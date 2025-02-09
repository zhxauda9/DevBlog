const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Главная страница
app.get('/', (req, res) => {
    res.send('Добро пожаловать в API блога!');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('✅ Успешно подключено к MongoDB');
}).catch(error => {
    console.error('❌ Ошибка подключения к MongoDB:', error);
});




const blogRoutes = require('./routes/blogRoutes');
app.use('/api', blogRoutes);
