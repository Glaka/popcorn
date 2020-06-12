import { $ } from "../../core/dom";

export class TableSelection {
    static className = "selected";

    group: any[];
    current: any;
    constructor() {
        this.group = []
        this.current = null
    }

    select($el: any) {
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