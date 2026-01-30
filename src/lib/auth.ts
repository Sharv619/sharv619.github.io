import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
  throw new Error('Missing required environment variables for authentication');
}

// JWT Token interface
export interface JWTPayload {
  username: string;
  exp: number;
  iat: number;
}

export class Auth {
  /**
   * Verify admin credentials
   */
  static async verifyCredentials(username: string, password: string): Promise<boolean> {
    if (username !== ADMIN_USERNAME) {
      return false;
    }

    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD!);
    return isValid;
  }

  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Generate JWT token
   */
  static generateToken(username: string): string {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const payload: Omit<JWTPayload, 'exp' | 'iat'> = {
      username
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '24h', // Token expires in 24 hours
      issuer: 'portfolio-api',
      audience: 'portfolio-admin'
    });
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): JWTPayload | null {
    try {
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET not configured');
      }

      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'portfolio-api',
        audience: 'portfolio-admin'
      }) as JWTPayload;

      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  /**
   * Get user from request (middleware helper)
   */
  static getUserFromRequest(req: NextApiRequest): JWTPayload | null {
    const authHeader = req.headers.authorization;
    const token = this.extractTokenFromHeader(authHeader);

    if (!token) {
      return null;
    }

    return this.verifyToken(token);
  }

  /**
   * Middleware to require authentication
   */
  static requireAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const user = this.getUserFromRequest(req);

        if (!user) {
          return res.status(401).json({
            success: false,
            error: 'Authentication required'
          });
        }

        // Add user to request object for use in handlers
        (req as any).user = user;

        return handler(req, res);
      } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
          success: false,
          error: 'Internal server error'
        });
      }
    };
  }

  /**
   * Handle login request
   */
  static async handleLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username and password required'
        });
      }

      const isValid = await this.verifyCredentials(username, password);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      const token = this.generateToken(username);

      return res.status(200).json({
        success: true,
        data: {
          token,
          expiresIn: '24h'
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}
