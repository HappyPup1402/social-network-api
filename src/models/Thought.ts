import { Schema, model, Document, ObjectId, Types } from 'mongoose';

// Define the Reaction schema interface
interface IReaction {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

// Define the Thought schema interface
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount: number; // for the virtual property
}

// Reaction Schema (Subdocument)
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp.toLocaleDateString(), // Format the date
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Thought Schema
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: Date) => timestamp.toLocaleDateString(), // Format the date
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Array of Reaction subdocuments
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create and export the Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
