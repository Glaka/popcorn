export const capitalize = (string) => {
    if (typeof string !== 'string') return '';
    return string
        .split('')
        .map((i, index) => (index === 0 ? i.toUpperCase() : i))
        .join('');
};
