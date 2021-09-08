import styles from './Sidebar.module.css'
import Playlists from './Playlists'

function Sidebar() {
	return (
		<div className={styles.Sidebar}>
			<p>Logo</p>
			<p>Home Feed</p>
			<button onClick={() => {
				window.open("http://localhost:4000/auth/spotify", "_self")
			}}>Login With Spotify</button>
			<Playlists />
		</div>
	)
}

export default Sidebar
