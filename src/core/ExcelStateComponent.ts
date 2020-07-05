import { ExcelComponent } from "./ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args: any) {
        super(...args)
    }
    get template() {
        return JSON.stringify(this.state, null, 2)
    }
    initState(state: object) {
        this.state = { ...state }
    }
    setState(newState: object) {
        this.state = { ...this.state, ...newState }
        this.$root.html(this.template)
    }
}