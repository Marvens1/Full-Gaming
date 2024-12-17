const Game = require('../models/Game');

const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createGame = async (req, res) => {
  try {
    const { title, url, thumbnail } = req.body;
    const game = await Game.create({ title, url, thumbnail });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getGames, createGame };
