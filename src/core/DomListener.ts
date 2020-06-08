import { capitalize } from "./utils"

class DomListener {
  $root: any
  listeners: any
  name: string
  [key: string]: any
  constructor($root: any, listeners: any = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener: any) => {
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
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener: any) => {
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
