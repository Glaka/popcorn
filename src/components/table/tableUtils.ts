export const shouldResize = (event: any): boolean => {
    return !event.target.dataset.resize ? false : true
}

export const shouldCellSelect = (event: any): boolean => {
    return event.target.dataset.type === 'cell'

}