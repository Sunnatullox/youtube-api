import { videoModel } from "../model/Video.models";
import fs from "fs";

export class VideoContrller {
  async upload(req, res) {
    const newVideo = new videoModel({
      owner: req.token._id,
      name: req.body.name,
      videopath: req.filename,
    });

    try {
      const saveVideo = await newVideo.save();
      return res.status(201).json({ msg: "Video successfully uploaded" });
    } catch (error) {
      return res.status(500).json({ msg: "Video upload failed" });
    }
  }



  stream(req, res) {
    const range = req.headers.range;
    console.log(range)
    if (!range) {
      return res
        .status(400)
        .json({ msg: "range header is required to start stream" });
    }
      const videopath = `videos/${req.params.filename}`;
      const videosize = fs.statSync(videopath).size;
      
      const start = Number(range.replace(/\D/g, ""));
      const chunk_size = 10 ** 6; // 1 MB
      const end = Math.min(start + chunk_size, videosize - 1);
      
      const contentLength = end - start + 1 ;
      const headers = {
        'Content-Length': contentLength,
        'Accept-Range': 'bytes',
        'Content-Type': 'video/mp40',
        'Content-Range': `bytes ${start}-${end}/${videosize}}`
      }
      res.writeHead(206, headers);
      const videostream = fs.createReadStream(videopath, { start, end });

     videostream.pipe(res);
  }

  update(req, res) {
    const name = req.body.name;
    const _id= req.body.id;

    if(!name) {
      return res.status(400).json({ msg:"Video name is required" });
    }

    videoModel.findOneAndUpdate({_id},{ $set:{ name } },{new: true}, (err, doc) => {
      if(err){
        return  res.status(500).json({ msg: "Network error: Failed to update video"});
      }
      return res.status(200).json({ msg:"Video updated successfully"})
    })
  }
}
