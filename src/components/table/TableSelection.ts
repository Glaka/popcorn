// import { $ } from "../../core/dom";
import { Ielement } from "../../core/types";

export class TableSelection {
    static className = "selected";

    group: Ielement[];
    current: Ielement;
    constructor() {
        this.group = []
        this.current = null
    }

    select($el: Ielement) {
        this.clear()
        this.group.push($el)
        $el.focus()
        $el.addClass([TableSelection.className])
        this.current = $el
    }

    clear() {
        this.group.forEach(($el) => $el.removeClass(TableSelection.className))
        this.group = []

    }

    selectGroup($group: [] = []) {
        this.clear()
        this.group = [...$group];
        this.group.forEach($el => {
            $el.addClass([TableSelection.className])
        });
    }
}