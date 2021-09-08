import styles from './Sidebar.module.css'

function Sidebar() {
	return (
		<div className={styles.Sidebar}>
			<p>Logo</p>
			<p>Home Feed</p>
			<button onClick={() => {
				window.open("http://localhost:4000/auth/spotify", "_self")
			}}>Login With Spotify</button>
			<p>Playlists</p>
		</div>
	)
}

export default Sidebar
