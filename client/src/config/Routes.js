import { Switch, Route } from 'react-router-dom'
import { HomePage, SongPage, PlaylistPage } from '../components/pages/_index'

function Routes() {
	return (
		<Switch>
			<Route exact path='/'>
				<HomePage />
			</Route>
			<Route path='/playlist/:id'>
				<PlaylistPage />
			</Route>
			<Route path='/track/:id'>
				<SongPage />
			</Route>
		</Switch>
	)
}

export default Routes
