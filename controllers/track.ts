import { Request, Response } from 'express'
import axios from 'axios'
import dotenv from 'dotenv';
import {SpotifyApi} from 'spotify-api';
const db = require('../models')

dotenv.config()

// get one Track and Associated Comments
const getTrack = async (req: Request, res: Response) => {
	try {
		const {trackId} = req.params
		// get track
		const {data: trackData} = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`,{
			headers: {
				"Authorization": `Bearer ${process.env.TEMP_OAUTH_TOKEN}`
			}
		})

		// get comments
		const commentsData = await db.comment.findAll({
			where: {trackId}
		})
		
		const trackComments = commentsData.map((comment: any) => comment.get())

		res.send({
			trackData,
			trackComments
		})
		
	} catch (error) {
		console.log(error)
		res.send(error)
		
	}
}


// get all Track of one playlist
const getSeveralTracks = async (ids: string) => {

	try {
	

		const tracks = await axios.get(`https://api.spotify.com/v1/tracks/`, {
			params: {
				ids
			},
			headers: {
				"Authorization": `Bearer ${process.env.TEMP_OAUTH_TOKEN}`
			}
		})

		return tracks.data
		
	} catch (error) {
		console.log(error)
	}

	
	
}

// exports
export { getTrack, getSeveralTracks }