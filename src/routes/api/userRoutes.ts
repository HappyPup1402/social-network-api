import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} from '../../controllers/userController.js';

const router = Router();

// Route to handle users
// /api/users
router.route('/').get(getAllUsers).post(createUser);

// Routes for a specific user
// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// Routes for adding/removing friends
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;
