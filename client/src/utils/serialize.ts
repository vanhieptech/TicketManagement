export default function(obj) {
  if (typeof obj === 'string') return obj
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      if(typeof obj[p] === 'string') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(JSON.stringify(obj[p])))
      }
    }
  }
  return str.join('&')
}
