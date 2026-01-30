import { NextApiRequest, NextApiResponse } from 'next';
import { Auth } from '@/lib/auth';
import connectToDatabase from '@/lib/database';
import PersonalInfo from '@/lib/models/PersonalInfo';

async function getPersonalInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    // For now, just return the first personal info document
    // In a real application, you might want to cache this or have user-specific profiles
    const personalInfo = await PersonalInfo.findOne().sort({ createdAt: -1 });

    if (!personalInfo) {
      return res.status(404).json({
        success: false,
        error: 'Personal information not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        name: personalInfo.name,
        title: personalInfo.title,
        email: personalInfo.email,
        location: personalInfo.location,
        bio: personalInfo.bio,
        avatar: personalInfo.avatar
      }
    });
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function updatePersonalInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const { name, title, email, location, bio, avatar } = req.body;

    if (!name || !title || !email || !location || !bio || !avatar) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Find and update the personal info document
    // Using findOneAndUpdate to ensure we only have one personal info document
    const updatedInfo = await PersonalInfo.findOneAndUpdate(
      {}, // Empty filter to match any document
      {
        name: name.trim(),
        title: title.trim(),
        email: email.toLowerCase().trim(),
        location: location.trim(),
        bio: bio.trim(),
        avatar: avatar.trim()
      },
      {
        new: true,
        upsert: true, // Create if doesn't exist
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        name: updatedInfo.name,
        title: updatedInfo.title,
        email: updatedInfo.email,
        location: updatedInfo.location,
        bio: updatedInfo.bio,
        avatar: updatedInfo.avatar
      }
    });
  } catch (error: any) {
    console.error('Error updating personal info:', error);

    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getPersonalInfo(req, res);
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    return Auth.requireAuth(updatePersonalInfo)(req, res);
  }

  return res.status(405).json({
    success: false,
    error: 'Method not allowed'
  });
}

export default handler;
