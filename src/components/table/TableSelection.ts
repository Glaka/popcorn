import { $ } from "../../core/dom";
import { ANY_TODO } from "../../core/utils";

export class TableSelection {
    static className = "selected";

    group: ANY_TODO[];
    current: ANY_TODO;
    constructor() {
        this.group = []
        this.current = null
    }

    select($el: ANY_TODO) {
        this.clear()
        this.group.push($el)
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