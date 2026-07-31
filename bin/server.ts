import dotenv from 'dotenv';
dotenv.config();
import { createServer, IncomingMessage, RequestListener, ServerResponse } from 'http';
import app from '../src/app';
import { Server, Socket } from 'socket.io';
import _fs from "fs";
import path from 'path';
import { serverConfig } from "./serverConfig";
import https from "https";
import SocketRoutes from "../src/api/endpoint/socket/socketRoutes";

(function startAppServer() {
  let webserver;

  if (serverConfig.protocol == "http") {
    webserver = createServer(app);
  } else {
    webserver = createHTTPSServer(app);
  }

  const io = new Server(webserver, {
    cors: {
      origin: '*',
    },
  });

  SocketRoutes(io);  // socket handler

  webserver.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server is running on ${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}`);
  });

  webserver.on('error', (error) => {
    console.error('HTTP Server encountered an error:', error);
  });
})();

function createHTTPSServer(_app: RequestListener<typeof IncomingMessage, typeof ServerResponse> | undefined) {
  // Path to SSL certificate and key
  const sslKeyPath = path.resolve(__dirname, '../ssl/server.key');
  const sslCertPath = path.resolve(__dirname, '../ssl/server.cert');

  const httpsOptions = {
    key: _fs.readFileSync(sslKeyPath),
    cert: _fs.readFileSync(sslCertPath),
  }

  return https.createServer(httpsOptions, _app)
}