import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const videoStorage = multer.diskStorage({
    destination:"videos",
    filename:(req, file, cb) => {
        const id = uuidv4();
        const token = req.token;
        const filename = `${token._id.toString()}-${id}`;
        req.filename =filename;
        cb(null, filename);
    }
});


export const videoUpload = multer({
    storage: videoStorage,
    limit:{
        fileSize: 90000000 * 5 // 10 MB
    },
    fileFilter : (req, file, cb) => {
        if(!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)){
            return cb(new Error("Video format not supported"))
        }
        cb(undefined, true)
    }
})