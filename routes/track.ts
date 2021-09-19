import express from "express";
import { getTrack } from "../controllers/song";

const router = express.Router()

router.get('/:trackId', getTrack)

export = router