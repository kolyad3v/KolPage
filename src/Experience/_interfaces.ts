export interface NameObject {
	namespace: string
	value: string
	original: string
}

export interface ISource {
	name: string
	type: string
	path: string | string[]
}

export interface IPosition {
	x: number
	y: number
	z: number
}
