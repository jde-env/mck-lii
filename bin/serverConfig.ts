export const serverConfig = {
    host: process.env.HOST || 'localhost',
    port: (process.env.PROTOCOL == "http" ? Number(process.env.PORT) : (Number(process.env.SSL_PORT))) || 80,
    protocol: process.env.PROTOCOL || 'http',
};
  