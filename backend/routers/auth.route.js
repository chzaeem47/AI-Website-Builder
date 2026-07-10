import express from 'express';
import { googleAuth, logout } from '../controllers/auth.controller.js';

const authRouter = express.Router();

/**
* Google Account Login Api
* /api/auth/google 
*/
router.post('/google',googleAuth)

/**
* Logout Api /api/auth/logout
*/
router.get('/logout',logout)