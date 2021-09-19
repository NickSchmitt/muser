import express from "express";
import { createNewComment, getAllComments, getTrackComments } from "../controllers/comment";

const router = express.Router()

router.get('/', getAllComments)
router.post('/', createNewComment)
router.get('/:trackId', getTrackComments)

export = router