import { $ } from "../../core/dom";

export class TableSelection {
    static className = "selected";

    group: any[];
    constructor() {
        this.group = []
    }

    select($el: any) {
        this.clear()
        this.group.push($el)
        $el.addClass([TableSelection.className])
    }

    clear() {
        this.group.forEach(($el) => $el.removeClass(TableSelection.className))
        this.group = []

    }

    selectGroup() { }
}