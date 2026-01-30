import mongoose from 'mongoose';
import connectToDatabase from '../src/lib/database';
import PersonalInfo from '../src/lib/models/PersonalInfo';
import { personalInfo } from '../src/lib/data';
import { Auth } from '../src/lib/auth';

async function migratePersonalInfo() {
  try {
    console.log('🚀 Starting data migration...');

    // Hash the default admin password
    const hashedPassword = await Auth.hashPassword(process.env.ADMIN_PASSWORD!);
    console.log('✅ Admin password hashed for security');

    // Migrate personal information
    const existingInfo = await PersonalInfo.findOne();

    if (existingInfo) {
      console.log('⚠️  Personal info already exists, skipping migration');
    } else {
      const newPersonalInfo = new PersonalInfo({
        name: personalInfo.name,
        title: personalInfo.title,
        email: personalInfo.email,
        location: personalInfo.location,
        bio: personalInfo.bio,
        avatar: personalInfo.avatar
      });

      await newPersonalInfo.save();
      console.log('✅ Personal information migrated successfully');
    }

    console.log('🎉 Migration completed!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Update your .env.local file with proper values:');
    console.log('   - JWT_SECRET: Use a secure, random string (min 64 characters)');
    console.log('   - ADMIN_PASSWORD: Hash generated above - replace the plain text');
    console.log(`   - ADMIN_PASSWORD: ${hashedPassword}`);
    console.log('2. Start your Next.js app: npm run dev');
    console.log('3. Test the API endpoints');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

async function main() {
  try {
    await connectToDatabase();
    await migratePersonalInfo();
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Run migration only if this script is executed directly
if (require.main === module) {
  main();
}

export { migratePersonalInfo };
