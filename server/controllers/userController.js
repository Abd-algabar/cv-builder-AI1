import User from '../models/User.js';
import bcrypt from 'bcrypt';
import Resume from '../models/Resume.js';
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name ||!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await  User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);
        newUser.password = undefined; // Exclude password from response

        res.status(201).json({ message: 'User registered successfully', token ,user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
      if (!  user.comparePassword(password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        user.password = undefined; // Exclude password from response

        res.status(200).json({ message: 'Login successfully', token, user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId;
        const resumes = await Resume.find({ userId: userId });

        return res.status(200).json({ resumes });
    } catch (error) {
        console.error('Error fetching user resume:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
