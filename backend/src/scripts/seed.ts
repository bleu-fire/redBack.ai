import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../modules/auth/user.model';
import { config } from '../config/env';

const sampleUsers = [
  {
    name: 'Karim Explorer',
    email: 'karim@redback.ai',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Sara SpiderHunter',
    email: 'sara@redback.ai',
    password: 'password123',
    role: 'user',
  },
  {
    name: 'Amine Biologist',
    email: 'amine@redback.ai',
    password: 'password123',
    role: 'user',
  },
];

const seedUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('Connected! Checking existing users...');

    for (const u of sampleUsers) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        await User.create({
          ...u,
          password: hashedPassword,
        });
        console.log(`✅ Created test user: ${u.email}`);
      } else {
        // Update password with hash if needed
        const hashedPassword = await bcrypt.hash(u.password, 10);
        await User.updateOne({ email: u.email }, { password: hashedPassword });
        console.log(`ℹ️ Updated user password hash: ${u.email}`);
      }
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
};

seedUsers();

