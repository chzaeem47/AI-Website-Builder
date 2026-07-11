import express from 'express'
import isAuthUser from '../middleware/isAuthUser.js'
import { generateWebsite, getWebsiteById } from '../controllers/website.controller.js'

const websiteRouter = express.Router()

websiteRouter.post('/generate',isAuthUser,generateWebsite)

websiteRouter.get('/get-by-id/:id',isAuthUser,getWebsiteById)


export default websiteRouter