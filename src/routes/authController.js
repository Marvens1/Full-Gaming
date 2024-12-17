const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fonksyon pou jenere yon token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
};

// Fonksyon pou anrejistre yon itilizatè
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifye si itilizatè a deja egziste
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Kreye itilizatè a
        const user = await User.create({ name, email, password });

        // Retounen repons avèk token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fonksyon pou konekte yon itilizatè
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Chache itilizatè a nan baz done a
        const user = await User.findOne({ email });

        // Verifye si modpas la kòrèk
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fonksyon pou jwenn pwofil itilizatè a
exports.getProfile = async (req, res) => {
    try {
        // Récupérer l'utilisateur via ID ki nan token JWT
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retounen pwofil itilizatè a
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
