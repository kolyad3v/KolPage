import Experience from '../Experience'
import { PointLight } from 'three'

export default class InteractivePointLight {
	constructor(position) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.time = this.experience.time
		this.position = {
			x: position.x,
			y: position.y,
			z: position.z,
		}

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('PointLight')
			this.debugFolder.close()
		}
		this.debugObject = {
			color: '#4766ff',
		}

		this.light = new PointLight(this.debugObject.color, 164, 0, 2)

		this.createPointLight()
		this.debugInit()
	}

	createPointLight() {
		this.light.position.set(this.position.x, this.position.y, this.position.z)
		this.light.castShadow = true
		this.light.shadow.mapSize.width = 256
		this.light.shadow.mapSize.height = 256
		this.light.shadow.camera.far = 70
		this.scene.add(this.light)
	}

	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.light, 'intensity')
				.name('intensity')
				.min(0)
				.max(1000)
				.step(0.001)
			this.debugFolder
				.add(this.light.position, 'x')
				.name('x')
				.min(-200)
				.max(200)
				.step(0.1)

			this.debugFolder
				.add(this.light.position, 'y')
				.name('y')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder
				.add(this.light.position, 'z')
				.name('z')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.light.color.set(this.debugObject.color)
			})
		}
	}

	update() {
		// this.light.position.x = Math.sin(this.time.elapsed * 0.01)
		// this.light.position.z = Math.sin(this.time.elapsed * 0.01)
	}
}
