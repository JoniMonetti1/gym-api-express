const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.getUser(id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, age, gender, height, weight, body_fat, activity_level, goal} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.createUser(name, email, hashedPassword, age, gender, height, weight, body_fat, activity_level, goal);
        if(!user) {
            return res.status(400).json({ message: 'User not created' });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, age, gender, height, weight, body_fat, activity_level, goal} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.updateUser(id, name, email, hashedPassword, age, gender, height, weight, body_fat, activity_level, goal);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.deleteUser(id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User with id ${id} deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}