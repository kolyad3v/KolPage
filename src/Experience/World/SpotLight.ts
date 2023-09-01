import Experience from '../Experience'
import { SpotLight, CameraHelper, Vector2 } from 'three'
import gsap from 'gsap'
export default class InteractiveSpotLight {
	constructor(name) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.sizes = this.experience.sizes

		// Animation
		this.webgl = document.querySelector('.webgl')
		this.lightOn = true
		this.mouse = new Vector2()

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('SpotLight')
			this.debugFolder.close()
		}

		this.debugObject = {
			color: '#ffffff',
		}

		this.light = new SpotLight(this.debugObject.color, 1000, 0, 0.2, 0.165, 1)

		this.createSpotLight()
		this.addAnimation()
		this.debugInit()
	}

	createSpotLight() {
		this.light.position.set(4.3, 23.1, 3.5)
		this.light.target.position.set(11.6, 0, 5.1)
		this.light.castShadow = true
		// this.spotLightCameraHelper = new CameraHelper(this.light.shadow.camera)
		this.light.shadow.camera.near = 0.1
		this.light.shadow.camera.far = 30
		// this.light.angle = 0
		this.scene.add(this.light, this.light.target)
	}

	addAnimation() {
		// this.webgl.addEventListener('click', () => {
		// 	if (this.lightOn) {
		// 		gsap.to(this.light, {
		// 			duration: 1.5,
		// 			ease: 'power2.inOut',
		// 			angle: 0.2,
		// 		})
		// 		this.lightOn = false
		// 	} else {
		// 		gsap.to(this.light, {
		// 			duration: 1.5,
		// 			ease: 'power2.inOut',
		// 			angle: 0,
		// 		})
		// 		this.lightOn = true
		// 	}
		// })

		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			// lol the pointer lock is locking the mouse at one coord on screen!
		})
	}
	// stops the scrolling of the page when the arrow keys are hit

	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.light, 'intensity')
				.name('intensity')
				.min(0)
				.max(10000)
				.step(0.001)
			this.debugFolder
				.add(this.light.position, 'x')
				.name('x')
				.min(-30)
				.max(50)
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
			this.debugFolder
				.add(this.light.target.position, 'x')
				.name('x target')
				.min(-200)
				.max(200)
				.step(0.1)

			this.debugFolder
				.add(this.light.target.position, 'y')
				.name('y target')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder
				.add(this.light.target.position, 'z')
				.name('z target')
				.min(-200)
				.max(200)
				.step(0.1)
			this.debugFolder
				.add(this.light, 'angle')
				.min(0)
				.max(Math.PI * 2)
				.step(0.005)
			this.debugFolder
				.add(this.light.shadow.camera, 'near')
				.min(0)
				.max(5)
				.step(0.1)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.light.color.set(this.debugObject.color)
			})
		}
	}

	update() {
		this.light.target.position.x = this.mouse.x * 10
		this.light.target.position.z = -this.mouse.y * 10
	}
}
