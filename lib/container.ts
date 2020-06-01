class Container {
	private constructorPool: Map<string, {}>;	

	constructor() {
		this.constructorPool = new Map<string, {}>();
	}

	regiseter(name: string, constructor: any) {
		this.constructorPool.set(name, constructor)
	}
}

const container = new Container();

export {
	container
}