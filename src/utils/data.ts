// utils/data.ts

import { User } from '../models/index.js'; // Import the User model
import { Thought } from '../models/index.js'; // Import the Thought model

// Dummy users data
export const users = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
    thoughts: [], // This will be populated after thoughts are inserted
    friends: [],  // You can add friends after inserting users
  },
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    thoughts: [],
    friends: [],  // Add friend references here later
  },
  {
    username: 'jane_doe',
    email: 'jane.doe@example.com',
    thoughts: [],
    friends: [],
  },
];

// Dummy thoughts data
export const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: 'lernantino',
    reactions: [
      {
        reactionBody: 'Great thought!',
        username: 'john_doe',
        createdAt: new Date(),
      },
      {
        reactionBody: 'I agree!',
        username: 'jane_doe',
        createdAt: new Date(),
      },
    ],
  },
  {
    thoughtText: 'Learning TypeScript is fun!',
    username: 'john_doe',
    reactions: [
      {
        reactionBody: 'It sure is!',
        username: 'jane_doe',
        createdAt: new Date(),
      },
    ],
  },
  {
    thoughtText: 'Mongoose makes database handling so easy.',
    username: 'jane_doe',
    reactions: [],
  },
];

// After seeding users and thoughts, we can update the `thoughts` and `friends` references
// This part is handled after insertion (the seeding process).
export const updateUserThoughtsAndFriends = async () => {
  // Update users' thoughts references
  const usersInDb = await User.find({});
  const thoughtsInDb = await Thought.find({});

  // Add thought _ids to users' thoughts arrays
  for (let i = 0; i < usersInDb.length; i++) {
    const user = usersInDb[i];
    const userThoughts = thoughtsInDb.filter((thought: any) => thought.username === user.username);
    const thoughtIds = userThoughts.map((thought: any) => thought._id);
    await User.findByIdAndUpdate(user._id, { $set: { thoughts: thoughtIds } });
  }

  // Add friend references (example: lernantino and john_doe are friends)
  const lerna = usersInDb.find((user: any) => user.username === 'lernantino');
  const john = usersInDb.find((user: any) => user.username === 'john_doe');
  if (lerna && john) {
    await User.findByIdAndUpdate(lerna._id, { $push: { friends: john._id } });
    await User.findByIdAndUpdate(john._id, { $push: { friends: lerna._id } });
  }
};
