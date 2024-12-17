const express = require('express');
const { getGames, addGame, deleteGame } = require('../controllers/gameController');

const router = express.Router();

router.get('/', getGames);
router.post('/', addGame);
router.delete('/:id', deleteGame);

module.exports = router; // Asire ke sa a egziste
