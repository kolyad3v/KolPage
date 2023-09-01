import Experience from '../../Experience'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import {
	Mesh,
	MeshMatcapMaterial,
	MeshNormalMaterial,
	MeshStandardMaterial,
	MeshToonMaterial,
} from 'three'

export default class Text {
	constructor(text, position, rotation, fontSize) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.resources = this.experience.resources
		this.resourceMatcap = this.resources.items.matCapTexture

		this.fontLoader = new FontLoader()
		this.text = text
		const { x, y, z } = position
		this.x = x
		this.y = y
		this.z = z
		this.rotation = rotation

		this.fontSize = fontSize

		// Init Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(`${text} Text`)
			this.debugFolder.close()
		}
		this.textInit()
	}

	textInit() {
		this.fontLoader.load('/fonts/Poppins.json', (font) => {
			// Material
			this.materialText = new MeshStandardMaterial({
				metalness: 1,
				roughness: 0,
			})
			let size
			this.fontSize ? (size = this.fontSize) : (size = 0.4)
			// Geometry
			this.textGeometry = new TextGeometry(this.text, {
				font,
				size,
				height: 0.1,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0.01,
				bevelSegments: 10,
			})

			// Mesh
			this.textMesh = new Mesh(this.textGeometry, this.materialText)
			this.textMesh.position.set(this.x, this.y, this.z)
			this.textMesh.rotation.y = this.rotation
			this.textMesh.castShadow = true

			// I've added to a group in space portfolio. May have been to overcome some bug?

			this.scene.add(this.textMesh)

			// Debug
			if (this.debug.active) {
				this.debugFolder
					.add(this.textMesh.position, 'x')
					.name('x')
					.min(-10)
					.max(20)
					.step(0.1)

				this.debugFolder
					.add(this.textMesh.position, 'y')
					.name('y')
					.min(-10)
					.max(20)
					.step(0.1)
				this.debugFolder
					.add(this.textMesh.position, 'z')
					.name('z')
					.min(-10)
					.max(20)
					.step(0.1)
				this.debugFolder
					.add(this.textMesh.rotation, 'y')
					.name('rotation')
					.min(-10)
					.max(10)
					.step(0.1)
				this.debugFolder
					.add(this.textMesh.material, 'metalness')
					.name('metalness')
					.min(0)
					.max(1)
					.step(0.1)
				this.debugFolder
					.add(this.textMesh.material, 'roughness')
					.name('roughness')
					.min(0)
					.max(1)
					.step(0.1)
				this.debugFolder.add(this.textMesh, 'castShadow')
			}
		})
	}
}
