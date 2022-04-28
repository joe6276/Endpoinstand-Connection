import express from 'express'
import { createUser, deleteUser, getUser, getUsers, homepage, loginUser, updateUser } from '../Controller/user.controller'
import { Allow } from '../Midlleware/Allow'
import { VerifyToken } from '../Midlleware/Verify'
const router=express.Router()


router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/home',VerifyToken,Allow, homepage)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id',VerifyToken, deleteUser)




export default router