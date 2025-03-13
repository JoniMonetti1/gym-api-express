const db = require('../config/db');

const getAllUsers = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (name, email, password, age, gender, height, weight, body_fat, activity_level, goal ) => {
    try {
        const [rows] = await db.query('INSERT INTO users (name, email, password, age, gender, height, weight, body_fat, activity_level, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
             [name, email, password, age, gender, height, weight, body_fat, activity_level, goal]);
        return {
            id: rows.insertId,
            name,
            email,
            password,
            age,
            gender,
            height,
            weight,
            body_fat,
            activity_level,
            goal
        }
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (id, name, email, hashedPassword, age, gender, height, weight, body_fat, activity_level, goal ) => {
    try {
        await db.query('UPDATE users SET name = ?, email = ?, password = ?, age = ?, gender = ?, height = ?, weight = ?, body_fat = ?, activity_level = ?, goal = ? WHERE id = ?',
            [name, email, hashedPassword, age, gender, height, weight, body_fat, activity_level, goal, id]
        );

        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        
        if (!rows[0]) {
            return null;
        }
    
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to update user: ${error.message}`);
    }
}

const deleteUser = async (id) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        return { message:  `User with id ${id} deleted` };
    } catch (error) {
        console.log(error);
    }
}

const findOne = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser, findOne };