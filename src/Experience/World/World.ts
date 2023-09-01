import Experience from '../Experience.ts'
import Environment from './Environment.ts'
import Floor from './Floor.ts'
import Text from './ProjectDisplay/Text.ts'
import ProjectDisplay from './ProjectDisplay/ProjectDisplay.ts'
import InteractiveSpotLight from './SpotLight.ts'
import Raycaster from '../Utils/Raycaster.ts'
import CursorAnimations from './CursorAnimations.ts'
import Resources from '../Utils/Resources.ts'
export default class World {
	experience: Experience
	scene: any
	resources:Resources
	spotLight: InteractiveSpotLight
	floor!: Floor
	eldiaProject!: ProjectDisplay
	stpProject!: ProjectDisplay
	spaceProject!: ProjectDisplay
	rmjProject!: ProjectDisplay
	forestProject!: ProjectDisplay
	environment!: Environment
	bioHeader!: Text
	bioText!: Text
	raycaster!: Raycaster
	cursorAnimation!: CursorAnimations
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Lighting
		this.spotLight = new InteractiveSpotLight("light")

		// Wait for resources
		this.resources.on('ready', () => {
			// Landscape
			this.floor = new Floor()

			// Display Items
			this.eldiaProject = new ProjectDisplay(
				"Big Mama's Mushroom Mania",
				{ x: -4.5, y: -0.1, z: 2 },
				0.2,
				{ x: -8.6, y: 2.8, z: 2.7 },
				0.2,
				'tile1',
				0.25
			)

			this.stpProject = new ProjectDisplay(
				'StayThePath',
				{ x: -11.8, y: 0, z: 0.5 },
				-0.1,
				{ x: 0.9, y: 3.3, z: 1.9 },
				-0.2,
				'tile6',
				0.25
			)

			this.spaceProject = new ProjectDisplay(
				'Space 2D/3D Portfolio',
				{ x: -12.9, y: 0, z: 2.9 },
				0.1,
				{ x: -4.7, y: 3.2, z: 2.3 },
				0.1,
				'tile5',
				0.25
			)

			this.rmjProject = new ProjectDisplay(
				'Roast My Jutsu',
				{ x: -1.3, y: 0, z: -0.2 },
				-0.4,
				{ x: 4.4, y: 3.3, z: 2.5 },
				-0.4,
				'tile4',
				0.25
			)

			this.forestProject = new ProjectDisplay(
				'Hyperlink Forest',
				{ x: -4.4, y: 3.6, z: 1.5 },
				-6.4,
				{ x: -1.4, y: 6.5, z: 1.7 },
				-0.2,
				'tile3',
				0.25
			)
			this.environment = new Environment()

			// Bio
			this.bioHeader = new Text('Nick Gillham', { x: 8.7, y: 2, z: 3 }, -0.5, 0.7)
			this.bioText = new Text(
				'FE: 3js, TS, Vue/React',
				{ x: 8.7, y: 1.1, z: 3 },
				-0.5,
				0.3
			)
			this.bioText = new Text(
				'BE: getting to grips with c#, .Net',
				{ x: 8.7, y: 0.5, z: 3 },
				-0.5,
				0.3
			)

			// Raycaster For Animations

			this.raycaster = new Raycaster()
			this.cursorAnimation = new CursorAnimations()
		})
	}

	update() {
		// this.pointLight.update()
		if (this.raycaster) this.raycaster.update()
		if (this.cursorAnimation) this.cursorAnimation.update()
		this.spotLight && this.spotLight.update()
	}
}
