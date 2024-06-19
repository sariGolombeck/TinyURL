import User from "../models/user.js";
import Link from "../models/link.js";
import mongoose from 'mongoose';

const userController = {

createUser: async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        // יצירת לינקים חדשים ושמירתם במסד הנתונים
        const linkPromises = req.body.links.map(linkData => {
            const link = new Link(linkData);
            return link.save();
        });
        const savedLinks = await Promise.all(linkPromises);

        // יצירת המשתמש החדש עם הלינקים שנשמרו
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            links: savedLinks.map(link => link._id)
        });

        // שמירת המשתמש במסד הנתונים
        await user.save();

        res.status(201).send(user);
    } catch (error) {
        console.error("Error creating user:", error);

        // ניקוי הלינקים שנשמרו במקרה של שגיאה
        if (savedLinks && savedLinks.length > 0) {
            const linkDeletePromises = savedLinks.map(link => Link.findByIdAndDelete(link._id));
            await Promise.all(linkDeletePromises);
        }

        res.status(400).send({ error: error.message });
    }
},
// קבלת כל המשתמשים
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error); 
        }
    },

    // קבלת משתמש לפי ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // עדכון משתמש לפי ID
    updateUserById: async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'links'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }

            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();
            res.send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // מחיקת משתמש לפי ID
    deleteUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

export default userController