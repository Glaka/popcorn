import { ANY_TODO } from './utils';
export class Emitter {
    listeners: ANY_TODO;
    constructor() {
        this.listeners = {}
    }

    dispatch(event: ANY_TODO, ...args: ANY_TODO) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach((listener: ANY_TODO) => {
            console.log("Emitter -> dispatch -> listener", listener)
            listener(...args)
        });
        return true
    }

    subscribe(event: ANY_TODO, fn: ANY_TODO) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event].filter((listener: ANY_TODO) => { listener !== fn })
        }
    }
}