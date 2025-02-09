const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// 📁 Раздаем статические файлы из папки "web"
app.use(express.static(path.join(__dirname, 'web')));

// 📌 Открываем index.html при GET /
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

// 📌 Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Подключено к MongoDB'))
    .catch(error => console.error('❌ Ошибка MongoDB:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

// 📁 Подключаем маршруты блога
const blogRoutes = require('./routes/blogRoutes');
app.use('/api', blogRoutes);
