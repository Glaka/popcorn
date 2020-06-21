import { capitalize, ANY_TODO } from "./utils"

class DomListener {
  $root: ANY_TODO
  listeners: string[]
  name: string
  [key: string]: ANY_TODO
  constructor($root: ANY_TODO, listeners: ANY_TODO = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener: string) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        )
      }
      this[method] = this[method].bind(this)
      // Тоже самое что и addEventListener
      this.$root.on(listener, this[method])
      // console.log("DomListener -> initDOMListeners -> this.$root", this.$root)
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener: string) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

// input => onInput
function getMethodName(eventName: string) {
  return 'on' + capitalize(eventName)
}

export default DomListener
