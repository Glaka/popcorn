export class TableSelection {
    group: any[];
    constructor() {
        this.group = []
    }

    select($el: any) {
        this.group.push($el)
        $el.addClass('selected')
    }
    selectGroup() { }
}