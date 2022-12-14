import {capitalize} from './utils'

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListener() {
        this.listeners.forEach(listener => {
            const method = capitalize(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListener() {
        this.listeners.forEach(listener => {
            const method = capitalize(listener)
            this.$root.off(listener, this[method])
        })
    }
}
