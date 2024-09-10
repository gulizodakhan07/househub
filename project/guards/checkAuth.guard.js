import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { BadRequestException } from '../exception/badRequest.exception.js';
config()
const JWT_SECRET = process.env.JWT_SECRET; 

export const CheckAuthGuard = (isProtected) => {
  return (req, _, next) => {
    if (!isProtected) {
      return next();
    }

    const token = req.headers['authorization'];

    if (!(token && token.startsWith('Bearer') && token.split(' ')[1])) {
      throw new BadRequestException(`Given token: ${token} is invalid`);
    }

    const accessToken = token.split(' ')[1];

    // Verify access token
    jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new BadRequestException('Token verification failed');
      }
      const { id, role } = decoded;
      req.userId = id;
      req.role = role;

      next();
    });
  };
};
