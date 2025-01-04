import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    console.log('REQ BODY ON SIGNUP', req.body);
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'Signup success' });
    } catch (error) {
        // next(errorHandler(550, 'Signup failed'));
        next(error);
    }
    await newUser.save();
    // res.status(201).json({ message: 'Signup success' }); 
};