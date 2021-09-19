import dotenv from 'dotenv'
import {Request, Response} from 'express'
import axios from 'axios'
import { Op } from 'sequelize'
const db = require("../models")

dotenv.config()

// get all comments of all songs
const getAllComments = async (req: Request, res: Response) => {
	try {
		const allComments = await db.comment.findAll({
			where: {trackId: {[Op.ne]: null}},
			include: db.user
		})

		// const trackIds = allComments.map((comment: { trackId: string })=>comment.trackId).join(',')

		// const response: any = await axios.get(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, {
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json',
		// 		'Authorization': `Bearer BQCvcc4l_IrwPhu6u57Kex5XvWBfz4hMl4RMWTxjlT2Kr1oMfNNlkfZ3oSKQIjvTYgruSaYrT1sAw674sh2-gHdV1L6v1yX8VADMn0jWFts6kNTAA_zRjZORGwVMTfKEOUhD-X0hqrjTnFnlNRxlC8jd1sbXL4nDSljmoVYDF2bdQo2CEkiEVU1K`
		// 	}
		// })

		// const tracks = response.data.tracks
		// const commentsWithSongs = allComments.map((comment: any) => {
		// 	let track = tracks.find((track: {id: string}) => comment.trackId === track.id)
		// 	track = {
		// 		artistName: track.artists[0].name,
		// 		albumImage: track.album.images[0].url,
		// 		trackName: track.name
		// 	}
		// 	return {...comment.get(), ...track}
		// })
		res.send("testing")
	} catch (error) {
		console.log(error)
	}
	
	
}

// get all comments of one song
const getTrackComments = async (req: Request, res: Response) => {
	const trackComments = await db.comment.findAll({
		where: {
			trackId: req.params.trackId
		}
	})

	res.send(trackComments)
}

// add a new comment to the database
const createNewComment = async (req: Request, res: Response) => {

	const createdComment = await db.comment.create(req.body)

	res.send(createdComment)
}

export {getAllComments, getTrackComments, createNewComment}