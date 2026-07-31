import { Server, Socket } from 'socket.io';
import { deviceSocketHandler } from './deviceSocketHandler';
import { authenticateSocket } from "../../middleware/socketMiddleware";

/**
 * Register all socket events and middleware.
 *
 * @param io - The Socket.IO server instance
 */
const registerSocketRoutes = (io: Server): void => {
    // Middleware to authenticate socket connections
    //   io.use(authenticateSocket);

    // Handle socket connections
    io.on('connection', (socket: Socket) => {
        console.log(`New client connected: ${socket.id}`);

        deviceSocketHandler(io, socket); // socket event handle related to device logic

        // Event: User sends real-time notifications
        socket.on('sendNotification', (notification) => {
            console.log(`Notification sent: ${JSON.stringify(notification)}`);
            io.emit('receiveNotification', notification);
        });
        
        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
        });
    });
};

export default registerSocketRoutes;