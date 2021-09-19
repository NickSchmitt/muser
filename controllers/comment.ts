import {Request, Response} from 'express'
const db = require("../models")

// get all comments of all songs
const getAllComments = async (req: Request, res: Response) => {
	try {
		const allComments = await db.comment.findAll({
			include: db.user
		})
		res.send(allComments)
	} catch (error) {
		console.log(error)
		res.send(error)
	}
	
	
}

// get all comments of one song
const getTrackComments = async (req: Request, res: Response) => {

	try {
		const trackComments = await db.comment.findAll({
			where: {
				trackId: req.params.trackId
			}
		})
	
		res.send(trackComments)
	} catch (error) {
		console.log(error)
		res.send(error)
	}
}

// add a new comment to the database
const createNewComment = async (req: Request, res: Response) => {
	try {
		const createdComment = await db.comment.create(req.body)
		res.send(createdComment)
	} catch (error) {
		res.status(500).send(error)
	}

}

export {getAllComments, getTrackComments, createNewComment}