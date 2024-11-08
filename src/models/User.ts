import { Schema, model, Document, ObjectId } from 'mongoose';

// Define the IUser interface
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
    friendCount: number; // for the virtual property
}

// Define the User schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create and export the User model
const User = model<IUser>('User', userSchema);

export default User;
