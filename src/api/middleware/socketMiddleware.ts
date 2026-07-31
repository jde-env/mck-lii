import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../conf/jwtConfig';

/**
 * Middleware to authenticate socket connections using JWT.
 *
 * @param socket - The connected client socket instance
 * @param next - The next middleware function
 */
export const authenticateSocket = (socket: Socket, next: (err?: ExtendedError) => void): void => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error('Authentication token is missing'));
    }

    try {
        // Verify JWT
        const payload = jwt.verify(token, jwtConfig.secret);
        socket.data.user = payload; // Attach user data to the socket
        next();
    } catch (err) {
        next(new Error('Invalid authentication token'));
    }
};
