import * as THREE from 'three'
import Experience from './Experience.js'


export default class Renderer {
    instance: any
	experience: Experience
	canvas: HTMLCanvasElement
	sizes: any
	scene: any
	camera: any
	debug: any
	debugFolder: any
	debugObject: { color: string }  = {
		color: '#000000',
	}
	
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas as HTMLCanvasElement
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Renderer').close()
			this.debugObject = {
				color: '#000000',
			}
		}
		this.setInstance()
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		})
		this.instance.physicallyCorrectLights = true
		this.instance.outputEncoding = THREE.sRGBEncoding
		this.instance.toneMapping = THREE.CineonToneMapping
		this.instance.toneMappingExposure = 1.75
		this.instance.shadowMap.enabled = true
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap
		this.instance.setClearColor('#000000')
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

		if (this.debug.active) {
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.instance.setClearColor(this.debugObject.color)
			})
		}
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}
