import express from 'express'
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from '../Controller/user.controller'
const router=express.Router()


router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)



export default router