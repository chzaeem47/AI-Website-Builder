import express from 'express'
import isAuthUser from '../middleware/isAuthUser.js'
import { generateWebsite, getAllWebsites, getWebsiteById, updateWebsite } from '../controllers/website.controller.js'

const websiteRouter = express.Router()

websiteRouter.post('/generate',isAuthUser,generateWebsite)

websiteRouter.get('/get-by-id/:id',isAuthUser,getWebsiteById)

websiteRouter.post('/update', isAuthUser, updateWebsite)

websiteRouter.get("/get-all", isAuthUser, getAllWebsites);

export default websiteRouter