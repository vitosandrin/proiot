import { Router } from "express";

import DeviceService from "../services/device";

const router = Router();
const deviceService = new DeviceService();

router.get("/:id", deviceService.findOne);
router.delete("/:id", deviceService.remove);
router.patch("/:id", deviceService.update);
router.get("/", deviceService.findAll);
router.post("/", deviceService.new);

export default router;
