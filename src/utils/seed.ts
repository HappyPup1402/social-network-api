// utils/seed.ts
import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { users, thoughts, updateUserThoughtsAndFriends } from './data.js';

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('Connected to database.');

  try {
    // Drop existing collections if they exist
    const thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
      await connection.dropCollection('thoughts');
      console.log('Thoughts collection dropped.');
    }

    const userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
      await connection.dropCollection('users');
      console.log('Users collection dropped.');
    }

    // Insert seed data
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    // Update user thoughts and friends references
    await updateUserThoughtsAndFriends();

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    process.exit(0);
  }
});
