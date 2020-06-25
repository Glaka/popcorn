import { capitalize, ANY_TODO } from "./utils"
import { Ielement } from "./types"

class DomListener {
  $root: Ielement
  listeners: string[]
  name: string
  [key: string]: ANY_TODO
  constructor($root: Ielement, listeners: ANY_TODO = []) {
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
function getMethodName(eventName: string): string {
  // In case of Error should be //@ts-expect-error
  return 'on' + capitalize(eventName)
}

export default DomListener
