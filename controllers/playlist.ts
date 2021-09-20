import { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv'
import { SpotifyApi } from 'spotify-api'
import { getSeveralTracks } from '../controllers/track'

dotenv.config()

interface Playlist {
	name: string;
	image: string;
	type: string;
	ownerImage?: string;
	ownerName?: string;
}

interface Track {
	id: string;
	name: string;
	albumName: string;
	albumImage: string;
	artistName: string;
	time: number;

}

// get user's playlists
const getUserPlaylists = async () => {}

// get one playlist
const getPlaylist = async (req: Request, res: Response) => {
	try {
		const {playlistId} = req.params
		const data: SpotifyApi.PlaylistObjectFull = (await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`,{
			headers: {
				"Authorization": `Bearer ${process.env.TEMP_OAUTH_TOKEN}`
			}
		})).data

		const playlistData: Playlist = {
			name: data.name,
			image: data.images[0].url,
			type: data.type,
			ownerName: data.owner.display_name
			
		}

		if (data.owner.images){
			playlistData.ownerImage = data.owner.images[0].url
		}

		const playlistTrackIds = data.tracks.items.map((track: SpotifyApi.PlaylistTrackObject) => track.track.id).join(',')
		const {tracks: playlistTrackData} = (await getSeveralTracks(playlistTrackIds))
		
		const playlistTracks = playlistTrackData.map((trackData: SpotifyApi.TrackObjectFull): Track => {
			return {
				id: trackData.id,
				name: trackData.name,
				albumName: trackData.album.name,
				albumImage: trackData.album.images[0].url,
				artistName: trackData.artists[0].name,
				time: trackData.duration_ms,
			}
		})

		res.send({...playlistData, tracks: playlistTracks})
		
	} catch (error) {
		console.log(error)
		res.send(error)
		
	}

}

export {getUserPlaylists, getPlaylist}