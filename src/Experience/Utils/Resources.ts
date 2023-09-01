import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from './EventEmitter.js'
import { ISource } from '../_interfaces.js'

export default class Resources extends EventEmitter {
	sources: ISource[]
	items: {}
	toLoad: number
	loaded: number
	loaders!: {
		dracoLoader: DRACOLoader, 
		gltfLoader: GLTFLoader,
		textureLoader: THREE.TextureLoader,
		cubeTextureLoader: THREE.CubeTextureLoader
	}
	constructor(sources: ISource[]) {
		super()

		this.sources = sources

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		this.setLoaders()
		this.startLoading()
	}

	setLoaders() {
		this.loaders = {}
		this.loaders.dracoLoader = new DRACOLoader()
		this.loaders.dracoLoader.setDecoderPath('/draco/')
		this.loaders.gltfLoader = new GLTFLoader()
		this.loaders.gltfLoader.dracoLoader = this.loaders.dracoLoader
		this.loaders.textureLoader = new THREE.TextureLoader()
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file

		this.loaded++

		if (this.loaded === this.toLoad) {
			this.trigger('ready')
		}
	}
}
