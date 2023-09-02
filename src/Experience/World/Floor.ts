import * as THREE from 'three'
import Experience from '../Experience.js'
import Resources from '../Utils/Resources.js'

export default class Floor {
	experience: Experience
	scene: THREE.Scene
	resources: Resources
	resourceMatcap: any
	debug: any
	debugObject: { color: string }
	debugFolder: any
	geometry!: THREE.CircleGeometry
	material!: THREE.MeshStandardMaterial
	mesh!: THREE.Mesh<THREE.CircleGeometry, THREE.Material>
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resourceMatcap = this.resources.items.matCapTexture

		this.setGeometry()
		this.setMaterial()
		this.setMesh()

		// Debug
		this.debug = this.experience.debug
		this.debugObject = {
			color: '#ffffff',
		}
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Floor').close()
		}

		this.setDebug()
	}

	setGeometry() {
		this.geometry = new THREE.CircleGeometry(100, 32)
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			color: '#c061cb',
			metalness: 0.94,
			roughness: 0,
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.rotation.x = -Math.PI * 0.5
		this.mesh.receiveShadow = true
		this.mesh.position.y = -1.2
		this.scene.add(this.mesh)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.mesh.position, 'y').min(-20).max(20).step(0.2)
			this.debugFolder
				.add(this.mesh.material, 'metalness')
				.min(0)
				.max(1)
				.step(0.01)
			this.debugFolder
				.add(this.mesh.material, 'roughness')
				.min(0)
				.max(1)
				.step(0.01)
			this.debugFolder.addColor(this.debugObject, 'color').onChange(() => {
				this.material.color.set(this.debugObject.color)
			})
		}
	}
}
