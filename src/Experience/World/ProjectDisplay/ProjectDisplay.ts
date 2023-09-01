import Experience from '../../Experience'
import DisplayBoard from './DisplayBoard.js'
import Text from './Text.ts'

export default class ProjectDisplay {
	constructor(
		name,
		boardCoords,
		boardRotation,
		headerCoords,
		headerRotation,
		source,
		fontSize
	) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.fontSize = fontSize
		// Display Content
		this.displayBoard = new DisplayBoard(name, boardCoords, boardRotation, source)

		// Header
		this.header = new Text(
			name,
			headerCoords,
			headerRotation,
			fontSize ? fontSize : 0.3
		)
	}
}
