import { Link } from 'react-router-dom';
import { items as playlists } from '../../data/playlists.json';
import styles from './Playlists.module.css'

function Playlists() {
	return (
		<div>
			{playlists.map((playlist) => {
				return (
					<Link to={`/playlist/${playlist.id}`} key={playlist.id}>
						<p className={styles.Playlist}>{playlist.name}</p>
					</Link>
				);
			})}
		</div>
	)
}

export default Playlists
