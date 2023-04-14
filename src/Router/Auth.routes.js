import { Router } from 'express';
import {AuthController} from '../Controller/Auth.Controller';

const router = Router();

const Controller  = new AuthController();
router.post('/signup', (req, res) => {
	Controller.signup(req, res)
})
router.post('/signin', (req, res) => {
	Controller.signin(req, res)
})
router.post('/password-reset', (req, res) => {
	Controller.forgotPassword(req, res)
})

export default router