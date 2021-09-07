import styles from './Sidebar.module.css'

function Sidebar() {
	return (
		<div className={styles.Sidebar}>
			<p>Logo</p>
			<p>Home Feed</p>
			<p>Playlists</p>
		</div>
	)
}

export default Sidebar
