import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/Role';

dotenv.config();

const seedRoles = async () => {
  await mongoose.connect(process.env.MONGO_URL!);

  const roles = [
    { name: 'admin', permissions: ['view_user_content', 'manage_users'] },
    { name: 'user', permissions: ['view_user_content'] },
  ];

  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role.name });
    if (!existingRole) {
      const newRole = new Role(role);
      await newRole.save();
    }
  }

  mongoose.disconnect();
};

seedRoles().catch((error) => {
  console.error('Error seeding roles:', error);
  mongoose.disconnect();
});