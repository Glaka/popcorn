export const shouldResize = (event: any): boolean => {
    return !event.target.dataset.resize ? true : false
}