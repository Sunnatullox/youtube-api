import {Schema, model} from "mongoose";



const UserSchema = new Schema({
username:{
	type:String,
		require:[true,"Username is required to create account"],
		unique:[true,"Account with this username already exists"]
	},
	email:{
		type:String,
		require:[true,"Email is required to create account"],
		unique:[true,"Account with this email already exist"]
	},
	password:{
		type:String,
		require:[true,"Password is required to create account"],
		minlength:6
	},
	videos:[
		{
			type:Schema.Types.ObjectId,
			ref:"videos"
		}
	],
	// People that subscribes/subscribed to user channe;
	subscribers:{
		type:Array,
		default:[]
	},
	// thes are the channels that the document user is subscribed to
	userSubscribedChanels:{
		type:Array,
		default:[]
	},
	
})

export const userModel = model("User", UserSchema)