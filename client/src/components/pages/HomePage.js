import { comments } from '../../data/comments/comments.json'
import { tracks } from '../../data/comments/commentsSongs.json'


function Home() {
	return (
		<div>
			<h1>Recent Comments</h1>
			{comments.map(commentData => {
				return (
					<p>{commentData.text}</p>
				)
			})}
		</div>
	)
}

export default Home
