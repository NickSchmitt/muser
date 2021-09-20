import express from 'express'
import { getPlaylist } from '../controllers/playlist'

const router = express.Router()

router.get('/:playlistId', getPlaylist)

export = router