import { NextApiRequest, NextApiResponse } from 'next';
import { Auth } from '@/lib/auth';
import connectToDatabase from '@/lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to database (even though login doesn't use it directly, keeping connection alive)
  await connectToDatabase();

  return Auth.handleLogin(req, res);
}
