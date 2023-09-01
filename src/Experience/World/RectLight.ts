import Experience from '../Experience'
import { RectAreaLight } from 'three'

export default class RectLight {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.debugObject = {
			color: '#4e5ed4',
		}

		this.light = new RectAreaLight(this.debugObject.color, 10, 1, 1)

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('RectLight')
			this.debugFolder.close()
		}

		this.createRectLight()
		this.debugInit()
	}

	createRectLight() {
		this.light.position.set(6.8, 0, 5.8)
		this.scene.add(this.light)
	}

	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.light, 'intensity')
				.name('intensity')
				.min(0)
				.max(10)
				.step(0.001)
			this.debugFolder
				.add(this.light.position, 'x')
				.name('x')
				.min(-10)
				.max(20)
				.step(0.1)

			this.debugFolder
				.add(this.light.position, 'y')
				.name('y')
				.min(-10)
				.max(20)
				.step(0.1)
			this.debugFolder
				.add(this.light.position, 'z')
				.name('z')
				.min(-10)
				.max(20)
				.step(0.1)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.light.color.set(this.debugObject.color)
			})
		}
	}
}
