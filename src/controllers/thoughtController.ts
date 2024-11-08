import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Controller functions
export const getAllThoughts = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thoughts', error });
    }
};

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thought', error });
    }
};

export const createThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const newThought = await Thought.create({ thoughtText, username });

        // Push the thought's _id to the associated user's thoughts array
        await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

        res.status(201).json(newThought);
    } catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(updatedThought);
    } catch (error) {
        res.status(500).json({ message: 'Error updating thought', error });
    }
};

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Remove the thought's _id from the associated user's thoughts array
        await User.findOneAndUpdate({ thoughts: thought._id }, { $pull: { thoughts: thought._id } });

        res.status(200).json({ message: 'Thought deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting thought', error });
    }
};

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reaction', error });
    }
};

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error });
    }
};
