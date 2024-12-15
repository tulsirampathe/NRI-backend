import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, 'secretKey', {
      expiresIn: '1h',
    });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000, // 1 hour
    });

    // Send user data in response
    const { password: _, ...userData } = newUser._doc; // Exclude password from response
    res.status(201).json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'secretKey', {
      expiresIn: '1h',
    });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000, // 1 hour
    });

    // Send user data in response
    const { password: _, ...userData } = user._doc; // Exclude password from response
    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
