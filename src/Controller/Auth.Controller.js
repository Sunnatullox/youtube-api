import { IncomingForm } from "formidable"
import { genSalt, hash, compare } from "bcrypt";
import { config } from "dotenv";
import { verify, sign } from "jsonwebtoken";
import { userModel } from "../model/User.models"
config()
export class AuthController {
	// signup method
	signup(req, res) {
		const form = new IncomingForm()
		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.status(500).json({ msg: "Network error: Field to create account, please try again" })
			}

			const { username, email, password } = fields

			const salt =await genSalt(15)
			const hashPassword = await hash(password, salt);
			const newAccount = new userModel({
				username, email, password: hashPassword
			})
			try {
				const savedAccount = await newAccount.save();
				return res.status(201).json({ msg: "Account created successfully", savedAccount })
			} catch (error) {
				// TODO handle error carrectly
				console.log(error)
				return res.status(500).json({ msg: "Network error creating account" })
			}
		}

		)
	}
	
	// signIn method
	signin(req, res) {
		const form = new IncomingForm()
		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.status(500).json({ msg: "Network error:Field to login, please try again" })
			}
			const { account, password } = fields
			const isAccountEmail = account.includes("@")

			if (isAccountEmail) {
				const user = await userModel.findOne({ email: account })
				if (!user) {
					return res.status(404).json({ msg: "Account with this email does not exist" })
				}

				const isPasswordValid = await compare(password, user.password)
				if (!isPasswordValid) {
					return res.status(400).json({ msg: "Invalid password" })
				}
				const token_payload = {
					_id: user.id,
					email: user.email,
					username: user.username
				}
				const token = sign(token_payload, process.env.cookie_secret, { expiresIn: "365d" })
				return res.status(200).json({ token })
			}
			const user = await userModel.findOne({username:account})
			if(!user){
				return res.status(404).json({msg:"Account with this username does not exist"})
			}
			const isPasswordValid = await compare(password, user.password)
			if (!isPasswordValid) {
				return res.status(400).json({ msg: " Invalid password" })
			}
			const token_payload = {
				_id: user.id,
				email: user.email,
				username: user.username
			}
			const token = sign(token_payload, process.env.cookie_secret, { expiresIn: "365d" })
			return res.status(200).json({ token })
		})
	}

	// forgot password method 
	forgotPassword(req, res) {
		const form = new IncomingForm();
		form.parse(req, async(err, fields, files) => {
			if (err) {
				res.status(500).json({ msg: "Network error:Field to reset password, please try again" })
			}

			const { email, password } = fields
			if (!email || !password) {
				return res.status(400).json({ msg: "All fields are required to reset password" })
			}
			const sale = await genSalt(15)
			const hashPassword = await hash(password, sale)
			try {
				const user = await userModel.findOne({ email: email})
				if(!user) {
					return res.status(404).json({ msg: "Account with this email does not exist or does not have"})
				}
				const updateUser = await userModel.findOneAndUpdate({ email: email }, { $set: { password: hashPassword } }, { new: true })
				return res.status(200).json({ msg: "Success to reset password" })
			} catch (error) {
				return res.status(500).json({msg:"Field to reset password, please try again"})
			}

		})
	}
}
