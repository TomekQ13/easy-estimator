export function saveToLocalStorage({ key, value }) {
    if (typeof key !== 'string') throw new Error('key must be a string to save item to LS')
    if (typeof value !== 'string') throw new Error('value must be a string to save item to LS')
    localStorage.setItem(key, value)
}

export function getFromLocalStorage({ key }) {
    if (typeof key !== 'string') throw new Error('key must be a string to get item from LS')
    return localStorage.getItem(key)
}