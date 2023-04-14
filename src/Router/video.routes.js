import { Router } from "express";
import { Authentecate as auth } from "../Middlewares/Athenticate.middeware";
import { videoUpload } from "../Middlewares/Video.middleware";
import { VideoContrller } from "../Controller/Video.controller";

const Controller = new VideoContrller();
const router = Router();

router.post("/video", auth, videoUpload.single("video"), (req, res) => {
  Controller.upload(req, res);
});

router.get("/video/:filename", (req, res) => {
  Controller.stream(req, res);
});

router.patch("/video", (req, res) => {
  Controller.update(req, res);
});

export default router;
// 34:21
