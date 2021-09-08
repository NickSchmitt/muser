import styles from './Player.module.css'
import SpotifyPlayer from 'react-spotify-web-playback'
function Player({ user }) {
	return (
		<div className={styles.Player}>
			{user &&
				<SpotifyPlayer
					token={user.access}
					syncExternalDevice={true}
					styles={{
						bgColor: '#121212',
						trackNameColor: '#FFFFFF',
						trackArtistColor: '#B3B3B3',
						sliderColor: '#B3B3B3',
						sliderTrackColor: '#282828',
						color: '#FFFFFF',
						height: '90px',
						sliderHandleColor: 'rgb(28, 185, 84)',
						errorColor: 'rgb(179, 179, 179)'
					}}
				/>
			}
		</div>
	)
}

export default Player
