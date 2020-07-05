export const parse = (value = '') => {
    console.log(value);
    if (value.startsWith('=')) {
        try {
            return eval(value.slice(1))

        } catch (error) {
            console.warn('parse error', error)
        }
    }
    return value
}