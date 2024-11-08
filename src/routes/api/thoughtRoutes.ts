import { Router } from 'express';
import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} from '../../controllers/thoughtController.js';

const router = Router();

// Routes for thoughts
//api/thoughts/
router.route('/').get(getAllThoughts).post(createThought);
//api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// Routes for reactions on a specific thought
// api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export default router;
