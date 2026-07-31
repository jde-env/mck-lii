import { Router } from 'express';
import { getUsers, getUserById } from './userController';

const router = Router();

router.get('/', getUsers);           // GET /api/v1/user
router.get('/:id', getUserById);      // POST /api/v1/user
// router.put('/:id', updateUser);      // PUT /api/v1/user/:id
// router.delete('/:id', deleteUser);   // DELETE /api/v1/user/:id

export default router;
