import { useState, useEffect } from 'react'
import styles from './styles/App.module.css'
import Routes from './config/Routes'
import Sidebar from './components/sidebar/Sidebar';
import Player from './components/player/Player'

export default function App() {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [authError, setAuthError] = useState(null)

	useEffect(() => {
		fetch("http://localhost:4000/auth/login/success", {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true
			}
		})
			.then(res => {
				if (res.status === 200) return res.json()
				throw new Error("Authentication failed.")
			}).then(res => {
				setAuthenticated(true)
				setUser(res?.user)
			}).catch(err => {
				console.log(err)
				setAuthenticated(false)
				setAuthError("Authentication failed.")
			})

	}, []);
	return (
		<div className={styles.App}>
			<Sidebar />
			<Routes />
			<Player user={user} />
		</div>
	);
}
