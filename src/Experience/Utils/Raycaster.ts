import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sizes from './Sizes'

export default class Raycaster extends EventEmitter {
	private experience: Experience
	private camera: THREE.PerspectiveCamera
	private controls: OrbitControls
	objectsToTestArray: THREE.Object3D<Event>[]
	sizes: Sizes
	mouse: THREE.Vector2
	//TODO type the below
	webglStyle: any
	infoBoxStp: any
	infoBoxRmj: any
	infoBoxEldia: any
	infoBoxSpace: any
	infoBoxForest: any
	stpHovered: boolean
	eldiaHovered: boolean
	rmjHovered: boolean
	spaceHovered: boolean
	forestHovered: boolean
	noHover: boolean
	grabOpen: boolean
	smoothToSpace: () => void
	smoothToEldia: () => void
	smoothToRmj: () => void
	smoothToStp: () => void
	smoothToForest: () => void
	smoothToStart: () => Promise<void>
	raycaster!: THREE.Raycaster
	intersectObjects: any
	objectHit!: THREE.Object3D

	constructor() {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		this.controls = this.experience.camera.controls
		this.objectsToTestArray = [
			this.experience.world.stpProject.displayBoard.model,
			this.experience.world.eldiaProject.displayBoard.model,
			this.experience.world.rmjProject.displayBoard.model,
			this.experience.world.spaceProject.displayBoard.model,
			this.experience.world.forestProject.displayBoard.model,
		]

		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// interactions
		this.webglStyle = (document.querySelector('.webgl') as HTMLElement).style
		this.infoBoxStp = document.querySelector('.infoBoxStp')
		this.infoBoxRmj = document.querySelector('.infoBoxRmj')
		this.infoBoxEldia = document.querySelector('.infoBoxEldia')
		this.infoBoxSpace = document.querySelector('.infoBoxSpace')
		this.infoBoxForest = document.querySelector('.infoBoxForest')

		this.stpHovered = false
		this.eldiaHovered = false
		this.rmjHovered = false
		this.spaceHovered = false
		this.forestHovered = false
		this.noHover = false
		this.grabOpen = true

		// create Raycaster
		this.createRaycaster()

		this.smoothToSpace = () => {
			this.infoBoxSpace.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 1,
				y: 0.68,
				z: 1.6,
			})
			gsap.to(this.controls.object.position, {
				duration: 2,
				ease: 'power2.inOut',
				x: -1.2436908861070275,
				y: 1.8155473048016435,
				z: 10.643615642758764,
			})
			this.infoBoxStp.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.infoBoxForest.classList.remove('visible')

			this.rmjHovered = false
			this.eldiaHovered = false
			this.stpHovered = false
			this.forestHovered = false
		}

		this.smoothToEldia = () => {
			this.infoBoxEldia.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: -4,
				y: 1.6,
				z: 3.2,
			})
			gsap.to(this.controls.object.position, {
				duration: 2,
				ease: 'power2.inOut',
				x: -1.2436908861070275,
				y: 1.8155473048016435,
				z: 10.643615642758764,
			})
			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxStp.classList.remove('visible')
			this.infoBoxForest.classList.remove('visible')

			this.spaceHovered = false
			this.rmjHovered = false
			this.stpHovered = false
			this.forestHovered = false
		}

		this.smoothToRmj = () => {
			this.spaceHovered = false
			this.eldiaHovered = false
			this.stpHovered = false
			this.forestHovered = false

			this.infoBoxRmj.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 8.5,
				y: 1.6,
				z: 1.6,
			})
			gsap.to(this.controls.object.position, {
				duration: 2,
				ease: 'power2.inOut',
				x: 1.3261597004730659,
				y: 1.6000000000000008,
				z: 11.457881042164475,
			})
			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxStp.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.infoBoxForest.classList.remove('visible')
		}

		this.smoothToStp = () => {
			this.infoBoxStp.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 5.7,
				y: 1.6,
				z: 3.2,
			})
			gsap.to(this.controls.object.position, {
				duration: 2,
				ease: 'power2.inOut',
				x: -1.0338212517004601,
				y: 1.9182158553510318,
				z: 11.194674280082424,
			})

			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.infoBoxForest.classList.remove('visible')

			this.spaceHovered = false
			this.rmjHovered = false
			this.eldiaHovered = false
			this.forestHovered = false
		}

		this.smoothToForest = () => {
			this.infoBoxForest.classList.add('visible')
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 4,
				y: 6.5,
				z: 1.7,
			})
			gsap.to(this.controls.object.position, {
				duration: 2,
				ease: 'power2.inOut',
				x: -1.3753161712780102,
				y: 6.7748337507552625,
				z: 12.177470357253018,
			})

			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')

			this.spaceHovered = false
			this.rmjHovered = false
			this.eldiaHovered = false
		}

		this.smoothToStart = async () => {
			gsap.to(this.controls.object.position, {
				duration: 2,
				ease: 'power2.inOut',
				x: -6.23115654920406,
				y: 0.6879470000000014,
				z: 22.054098635464182,
			})
			gsap.to(this.controls.target, {
				duration: 2,
				ease: 'power2.inOut',
				x: 1,
				y: 0.68,
				z: 1.6,
			})
			this.infoBoxSpace.classList.remove('visible')
			this.infoBoxRmj.classList.remove('visible')
			this.infoBoxEldia.classList.remove('visible')
			this.infoBoxStp.classList.remove('visible')
			this.infoBoxForest.classList.remove('visible')
		}
	}

	createRaycaster() {
		this.raycaster = new THREE.Raycaster()

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
		})

		// interactions
		// do the same for other objects when ready -->

		document.querySelector('.webgl')!.addEventListener('mousedown', () => {
			this.grabOpen = false
			this.webglStyle.cursor = 'grabbing'
		})
		document.querySelector('.webgl')!.addEventListener('mouseup', () => {
			this.grabOpen = true
		})
		document.querySelector('.webgl')!.addEventListener('click', () => {
			this.stpHovered && this.smoothToStp()
			this.eldiaHovered && this.smoothToEldia()
			this.rmjHovered && this.smoothToRmj()
			this.spaceHovered && this.smoothToSpace()
			this.forestHovered && this.smoothToForest()
		})
		document.querySelector('.webgl')!.addEventListener('click', () => {
			this.noHover && this.smoothToStart()
		})
	}

	showNotice(board: string) {
		switch (board) {
			case 'Space':
				if (!this.spaceHovered) {
					this.spaceHovered = true
					this.noHover = false
				}
				break
			case 'Rmj':
				if (!this.rmjHovered) {
					this.rmjHovered = true
					this.noHover = false
				}

				break
			case 'Eldia':
				if (!this.eldiaHovered) {
					this.eldiaHovered = true
					this.noHover = false
				}
				break
			case 'Stp':
				if (!this.stpHovered) {
					this.stpHovered = true
					this.noHover = false
				}
				break
			case 'forest':
				if (!this.forestHovered) {
					this.forestHovered = true
					this.noHover = false
				}
				break
			default:
				break
		}
	}

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		// console.log(this.controls.object.position)

		this.intersectObjects = this.raycaster.intersectObjects(
			this.objectsToTestArray
		)
		// console.log(this.intersectObjects)
		if (this.intersectObjects.length > 0) {
			this.objectHit = this.intersectObjects[0].object
			// console.log(this.objectHit.name)
			switch (this.objectHit.name) {
				case 'tile5_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Space')
					break
				case 'tile1_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Eldia')
					break
				case 'tile4_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Rmj')
					break
				case 'tile6_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('Stp')
					break
				case 'tile3_2':
					this.webglStyle.cursor = 'pointer'
					this.showNotice('forest')
					break
				default:
					break
			}
		} else {
			this.grabOpen && (this.webglStyle.cursor = 'grab')

			this.spaceHovered = false
			this.rmjHovered = false
			this.eldiaHovered = false
			this.stpHovered = false
			this.forestHovered = false

			this.noHover = true
		}
	}
}
