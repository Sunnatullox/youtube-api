import { Schema , model } from 'mongoose'


const videoSchema = new Schema({
	owner:{
		type: Schema.Types.ObjectId,
		ref:"user"
	},
	name:{
		type: String,
		required:[true, "Video name is required to upload video"]
	},
	videopath:{
		type: String,
		required:[true, "Video path is required to upload video"],
		unique:[true,"video path already exists"]
	},
	likes:{
		type: Number,
		default :0
	},
	dislikes:{
		type: Number,
		default:0
	},
	views:{
		type:Array,
		default:[]
	},
	comments:{
		type:Array,
		default:[]
	}
})

export const videoModel = model("video",videoSchema)