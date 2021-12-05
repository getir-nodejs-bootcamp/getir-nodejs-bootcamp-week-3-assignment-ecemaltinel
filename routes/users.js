import express from 'express';
import {getUsers, getUserbyId, createUser,deleteUserbyId, changeUserbyId, updateUserbyId} from '../controllers/users.js'
import verifyToken from '../authorization/token.js';
const router = express.Router();

//controllers wont be reached unless token is verified by verifyToken function

router.get('/', verifyToken, getUsers)
router.get('/:id',verifyToken,getUserbyId)
router.post('/',verifyToken, createUser)
router.delete('/:id',verifyToken, deleteUserbyId)
router.patch('/:id',verifyToken,changeUserbyId)
router.put('/:id',verifyToken,updateUserbyId)

export default router;