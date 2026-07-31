export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'test-secrect',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
