// Pure functions
export function capitalize(string: string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const range = (start: number, end: number) => {
  if (start >= end) [end, start] = [start, end]
  return new Array(end - start + 1).fill('').map((_, i) => start + i);
};

export type ANY_TODO = any;

export const storage = (key: ANY_TODO, data: ANY_TODO = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const isEqual = (a: any, b: any): boolean => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export const camelToCebab = (camel: string) => {
  return camel.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}

export const tiInineStyles = (styles = {}) => {
  return Object.keys(styles)
    .map((key) => {
      // @ts-expect-error
      return `${camelToCebab(key)}: ${styles[key]}`
    })
    .join('; ')
}

export function debounce(fn: { apply: (arg0: any, arg1: any) => void; }, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}