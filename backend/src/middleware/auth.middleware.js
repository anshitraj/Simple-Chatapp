import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]; // Extract token from 'Bearer <token>'
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt; // This is for compatibility if you still want to support cookies
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;  // Attach user to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in protectRoute middleware:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
