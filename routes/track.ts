import express from "express";
import { getTrack } from "../controllers/track";

const router = express.Router()

router.get('/:trackId', getTrack)

export = router