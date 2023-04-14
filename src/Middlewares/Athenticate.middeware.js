import {verify} from 'jsonwebtoken'
import { config } from "dotenv";
config()

export const Authentecate = (req, res, next) => {
	const token = req.headers["x-auth-token"];
	verify(token, process.env.cookie_secret, (error, decoded) => {
		if (error) {
			return res.status(400).json({ msg:"Signup or Login to upload video" });
		}
		req.token = decoded;
		next();
	})
}