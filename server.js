const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Connexion à la base de données
connectDB();

// Middleware de base
app.use(express.json());

// Importer les routes
const authRoutes = require('./src/routes/authRoutes');
const gameRoutes = require('./src/routes/gameRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Définir les routes principales
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
