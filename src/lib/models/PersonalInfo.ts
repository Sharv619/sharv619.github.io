import mongoose, { Schema, Document } from 'mongoose';

export interface IPersonalInfo extends Document {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonalInfoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  bio: {
    type: String,
    required: true,
    maxlength: 1000
  },
  avatar: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  }
}, {
  timestamps: true,
  collection: 'personal_info'
});

// Create indexes for better query performance
PersonalInfoSchema.index({ name: 1 });
PersonalInfoSchema.index({ email: 1 });

// Prevent duplicate emails
PersonalInfoSchema.pre('save', async function(next: (error?: Error) => void) {
  const existing = await mongoose.model('PersonalInfo').findOne({
    email: this.email,
    _id: { $ne: this._id }
  });

  if (existing) {
    const error = new Error('Email already exists');
    next(error);
  } else {
    next();
  }
});

const PersonalInfo = mongoose.models.PersonalInfo ||
  mongoose.model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);

export default PersonalInfo;
