import * as THREE from 'three'
import { lerp } from 'three/src/math/MathUtils'
import Experience from '../Experience'

export default class CursorAnimations {
	constructor() {
		this.experience = new Experience()
		this.environment = this.experience.world.environment.environmentMap
		this.pointLight = this.experience.world.pointLight.light
		this.camera = this.experience.camera.instance
		this.time = this.experience.time

		// For use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// Camera Animation

		// Instantiate Cursor Watcher
		this.cursorWatch()
	}

	cursorWatch() {
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
		})
	}
	update() {
		// Utils
		// y runs from 1 top to -1 bottom screen
		// console.log(this.mouse.y)

		// Edit env map intensity on objects as the cursor moves
		// this.environment.intensity = Math.abs(3 + this.mouse.x + this.mouse.y)
		// this.environment.updateMaterials()

		// Edit the point light to change attributes as cursor moves
		this.pointLight.position.y = this.mouse.y * 0.5
		// this.pointLight.intensity = 50 - Math.abs(this.mouse.y * 50)

		// Set up a parralax effect for camera movement on cusor movement
		// this.parallaxX = this.mouse.x * 2
		// this.parallaxY = this.mouse.y * 2
		// this.camera.position.x += this.parallaxX * 0.1
		// this.camera.position.y += this.parallaxY * 0.1
	}
}
