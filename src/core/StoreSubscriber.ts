import { isEqual } from "./utils"

export class StoreSubscriber {
    store: any
    sub: any
    prevState: any
    constructor(store: object) {
        this.store = store
        this.sub = null
        this.prevState = {}
    }

    subscribeComponents(components: any) {
        this.prevState = this.store.getState()
        this.sub = this.store.subscribe((state: any) => {
            Object.keys(state).forEach(key => {
                if (!isEqual(this.prevState[key], state[key])) {
                    console.log(key);
                    components.forEach((component: any) => {
                        if (component.isWatching(key)) {
                            const changes = { [key]: state[key] }
                            component.storeChanged(changes)
                        }
                    });
                }
            });
        })
        this.prevState = this.store.getState()
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }
}