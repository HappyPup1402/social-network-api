// data.ts
import { Types } from 'mongoose';

export const users = [
    {
        _id: new Types.ObjectId(),
        username: "john_doe",
        email: "john@example.com",
        thoughts: [],
        friends: []
    },
    {
        _id: new Types.ObjectId(),
        username: "jane_smith",
        email: "jane@example.com",
        thoughts: [],
        friends: []
    }
];

export const thoughts = [
    {
        thoughtText: "This is a thought by John.",
        username: "john_doe",
        reactions: [
            {
                reactionId: new Types.ObjectId(),
                reactionBody: "Nice thought!",
                username: "jane_smith",
                createdAt: new Date(),
            },
        ],
    },
    {
        thoughtText: "This is another thought by Jane.",
        username: "jane_smith",
        reactions: [
            {
                reactionId: new Types.ObjectId(),
                reactionBody: "I totally agree!",
                username: "john_doe",
                createdAt: new Date(),
            },
        ],
    }
];
