import express from 'express'
import isAuthUser from '../middleware/isAuthUser.js'
import { generateWebsite } from '../controllers/website.controller.js'

const websiteRouter = express.Router()

websiteRouter.post('/generate',isAuthUser,generateWebsite)

export default websiteRouter