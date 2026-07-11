import express from 'express'
import { getCurrUser } from '../controllers/user.controller.js'
import isAuthUser from '../middleware/isAuthUser.js'

const userRouter = express.Router()

userRouter.get('/me',isAuthUser,getCurrUser)

export default userRouter