import styles from './styles/App.module.css'
import Routes from './config/Routes'
import Sidebar from './components/sidebar/Sidebar';
import Player from './components/player/Player'

export default function App() {
	return (
		<div className={styles.App}>
			<Sidebar />
			<Routes />
			<Player />
		</div>
	);
}
