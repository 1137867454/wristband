export function setItem (key, value) {
  // console.log('setToken')
  localStorage.setItem(key, value)
}

export function getItem (key) {
  // console.log('getToken')
  var value = localStorage.getItem(key)
  return value
}

export function removeItem (key) {
  // console.log('remove')
  localStorage.removeItem(key)
}
