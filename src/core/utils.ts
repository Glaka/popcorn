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