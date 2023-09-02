import * as THREE from 'three'
import { CameraHelper } from 'three'
import Experience from '../Experience.ts'
import Resources from '../Utils/Resources.ts'
import Debug from '../Utils/Debug.ts'

export default class Environment {
	private experience: Experience
	private scene: THREE.Scene
	private resources: Resources
	private debug: Debug
	private debugFolder: any // Assuming this is the correct type
	private debugObject: { color: number }
	public environmentMap!: { intensity: number; texture: THREE.CubeTexture }

	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debugObject = { color: 0x023149 }
		// Debug
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('environment').close()
		}

		this.setEnvironmentMap()
		this.setSunLight()
	}

	setSunLight() {
		const sunLight = new THREE.DirectionalLight('#ffffff', 1)
		sunLight.castShadow = true
		sunLight.shadow.camera.far = 18
		sunLight.shadow.mapSize.set(1024, 1024)
		sunLight.shadow.normalBias = 0.05
		sunLight.shadow.camera.right = 8
		sunLight.shadow.camera.top = 5
		sunLight.position.set(-6.1, 9.9, 35.7)
		sunLight.intensity = 2.2

		const sunLightCameraHelper = new CameraHelper(sunLight.shadow.camera)
		sunLightCameraHelper.visible = false

		this.scene.add(sunLight, sunLightCameraHelper)

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(sunLight, 'intensity')
				.name('sunLightIntensity')
				.min(0)
				.max(10)
				.step(0.1)

			this.debugFolder
				.add(sunLight.position, 'x')
				.name('sunLightX')
				.min(-50)
				.max(50)
				.step(0.1)

			this.debugFolder
				.add(sunLight.position, 'y')
				.name('sunLightY')
				.min(-50)
				.max(50)
				.step(0.1)

			this.debugFolder
				.add(sunLight.position, 'z')
				.name('sunLightZ')
				.min(-50)
				.max(50)
				.step(0.1)

			this.debugFolder.addColor({ color: '#ffffff' }, 'color').onChange(() => {
				sunLight.color.set(this.debugObject.color)
			})

			this.debugFolder.add(sunLightCameraHelper, 'visible')
		}
	}

	setEnvironmentMap() {
		this.environmentMap = {} as { intensity: number; texture: THREE.CubeTexture }

		this.environmentMap.intensity = 1
		this.environmentMap.texture = this.resources.items
			.environmentMapTexture as THREE.CubeTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		this.scene.environment = this.environmentMap.texture
		this.scene.background = this.environmentMap.texture

		const updateMaterials = () => {
			this.scene.traverse((child) => {
				if (
					child instanceof THREE.Mesh &&
					child.material instanceof THREE.MeshStandardMaterial
				) {
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity = this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}
		updateMaterials()

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.environmentMap, 'intensity')
				.name('envMapIntensity')
				.min(0)
				.max(40)
				.step(0.001)
				.onChange(updateMaterials)
		}
	}
}
