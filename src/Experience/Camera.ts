import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Vector3 } from 'three'
import Sizes from './Utils/Sizes.js'

export default class Camera {
	controls!: OrbitControls
	experience: Experience
	sizes: Sizes
	scene: THREE.Scene
	canvas: HTMLCanvasElement
	debug: any
	debugFolder: any
	instance!: THREE.PerspectiveCamera

	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		// Debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera').close()
		}

		this.setInstance()
		this.setControls()
		this.setDebug()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(-7, -0.4, 23)

		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
		this.controls.target = new Vector3(3, 0.6879468680988509, 1.6)

		// this.controls.dampingFactor = 0.5 not quite sure what this does, trying to slow the damping down. lets try:
		// that's the one.
		this.controls.rotateSpeed = 0.2

		// set the degree to which you can orbit around a target. must be between max 2pi and min -2pi.
		this.controls.maxAzimuthAngle = 0.9
		this.controls.minAzimuthAngle = -0.7

		// amount of possible dollying out.
		this.controls.maxDistance = 25

		// how far to orbit vertically, default pi radians, max is pi.
		this.controls.maxPolarAngle = Math.PI / 2
		this.controls.minPolarAngle = Math.PI / 4

		this.controls.enablePan = false
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.controls, 'enablePan')
			this.debugFolder
				.add(this.controls, 'maxAzimuthAngle')
				.min(0)
				.max(2)
				.step(0.1)
				.name('maxAzimuthAngle')
			this.debugFolder
				.add(this.controls, 'minAzimuthAngle')
				.min(-2)
				.max(0)
				.step(0.1)
				.name('minAzimuthAngle')
			this.debugFolder
				.add(this.controls, 'maxDistance')
				.min(4)
				.max(10)
				.step(0.1)
				.name('maxDistance')
			this.debugFolder
				.add(this.instance.position, 'x')
				.min(-400)
				.max(500)
				.step(0.1)
				.name('x')
			this.debugFolder
				.add(this.instance.position, 'y')
				.min(-400)
				.max(500)
				.step(0.1)
				.name('y')
			this.debugFolder
				.add(this.instance.position, 'z')
				.min(-400)
				.max(500)
				.step(0.1)
				.name('z')
		}
	}

	update() {
		this.controls.update()
		// console.log(this.controls.target)
	}
}
