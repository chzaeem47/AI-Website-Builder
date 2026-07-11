import express from 'express';
import { googleAuth, login, logout, signup } from '../controllers/auth.controller.js';
import { Router } from 'express';

const authRouter = express.Router();

/**
* Google Account Login Api
* /api/auth/google 
*/
authRouter.post('/google',googleAuth)

/**
 * LOGIN API
 */
authRouter.post('/login',login)

/**
 * SIGNUP API
 */
authRouter.post('/signup',signup)

/**
* Logout Api /api/auth/logout
*/
authRouter.get('/logout',logout)

export default authRouter