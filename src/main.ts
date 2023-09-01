import './style.css'

import Experience from './Experience/Experience.js'

const experience: Experience = new Experience(
	document.querySelector('canvas.webgl') as HTMLCanvasElement
)
