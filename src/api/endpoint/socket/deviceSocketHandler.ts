import { Server, Socket } from 'socket.io';

const deviceSocketHandler = (io: Server, socket: Socket): void => {

  // Event: Listen to user commands for IoT devices
  socket.on('device:command', (command) => {
    console.log(`Command for device: ${JSON.stringify(command)}`);

    // Send the command back to the relevant device
    socket.to(command.deviceId).emit('device:execute', command);
  });

  // event: Device data updates
  socket.on('device:update', (payload) => {
    console.log('Device update received:', payload);

    // Broadcast updated device data to all connected clients
    socket.broadcast.emit('device:updated', payload);
  });

};

export { deviceSocketHandler };
