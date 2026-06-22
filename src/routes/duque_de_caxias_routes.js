import express from "express";
import { get_duque_de_caxias } from "../controllers/prefeituras/duque_de_caxias_controller.js";

const router = express.Router();

router.get("/", get_duque_de_caxias);

export default router;