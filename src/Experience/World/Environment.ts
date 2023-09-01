import * as THREE from 'three'
import { CameraHelper } from 'three'
import Experience from '../Experience.js'
import Fog from './Fog.js'

export default class Environment {
	 constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources


		// Debug
		this.debug = this.experience.debug
		this.debugObject = {
			color: '#ffffff',
		}
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('environment').close()
		}

		this.setEnvironmentMap()
		this.setSunLight()
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
		this.sunLight.castShadow = true
		this.sunLight.shadow.camera.far = 18
		this.sunLight.shadow.mapSize.set(1024, 1024)
		this.sunLight.shadow.normalBias = 0.05
		this.sunLight.shadow.camera.right = 8
		this.sunLight.shadow.camera.top = 5
		this.sunLight.position.set(-1.7, 10, -5.6)
		this.sunLight.intensity = 0.2

		this.sunLightCameraHelper = new CameraHelper(this.sunLight.shadow.camera)
		this.sunLightCameraHelper.visible = false

		this.scene.add(this.sunLight, this.sunLightCameraHelper)

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.sunLight, 'intensity')
				.name('sunLightIntensity')
				.min(0)
				.max(10)
				.step(0.1)

			this.debugFolder
				.add(this.sunLight.position, 'x')
				.name('sunLightX')
				.min(-50)
				.max(50)
				.step(0.1)

			this.debugFolder
				.add(this.sunLight.position, 'y')
				.name('sunLightY')
				.min(-50)
				.max(50)
				.step(0.1)

			this.debugFolder
				.add(this.sunLight.position, 'z')
				.name('sunLightZ')
				.min(-50)
				.max(50)
				.step(0.1)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.sunLight.color.set(this.debugObject.color)
			})
			this.debugFolder.add(this.sunLightCameraHelper, 'visible')
		}
	}

	setEnvironmentMap() {
		this.environmentMap = {}
		this.environmentMap.intensity = 1
		this.environmentMap.texture = this.resources.items.environmentMapTexture
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		this.scene.environment = this.environmentMap.texture
		this.scene.background = this.environmentMap.texture

		this.environmentMap.updateMaterials = () => {
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
		this.environmentMap.updateMaterials()

		// Debug
		if (this.debug.active) {
			this.debugFolder
				.add(this.environmentMap, 'intensity')
				.name('envMapIntensity')
				.min(0)
				.max(40)
				.step(0.001)
				.onChange(this.environmentMap.updateMaterials)
		}
	}
}
