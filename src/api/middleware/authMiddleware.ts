import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            req.pause();
            token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new Error("Authentication token is missing");
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };

            const user = await User.findById(decoded.id).select('-password');

            if (user) {
                req.user = user; // Assign to req.user only if user is not null
            } else {
                req.user = undefined; // Explicitly set to undefined if user is null
            }
            req.resume();
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
