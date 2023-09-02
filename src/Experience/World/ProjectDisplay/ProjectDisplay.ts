import { Scene } from 'three'
import Experience from '../../Experience'
import { IPosition } from '../../_interfaces.ts'
import DisplayBoard from './DisplayBoard.js'
import Text from './Text.ts'
import Resources from '../../Utils/Resources.ts'

export default class ProjectDisplay {
	experience: Experience
	scene: Scene
	resources: Resources
	fontSize: number
	displayBoard: DisplayBoard
	header: Text
	constructor(
		name: string,
		boardCoords: { x: number; y: number; z: number },
		boardRotation: number,
		headerCoords: IPosition,
		headerRotation: number,
		source: string,
		fontSize: number
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
