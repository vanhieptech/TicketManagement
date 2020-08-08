const ObjProto = Object.prototype

let toString = ObjProto.toString

const util : any = {}

util.isArray = function(obj) {
  return Array.isArray(obj)
}

const MAX_ARRAY_INDEX = 2 ** 53 - 1
util.isArrayLike = function(obj) {
  if (typeof obj !== 'object' || !obj) {
    return false
  }
  const length = obj.length
  return (
    typeof length === 'number' &&
    length % 1 === 0 &&
    length >= 0 &&
    length <= MAX_ARRAY_INDEX
  )
}

util.isObject = function(obj) {
  const type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

util.each = function(obj, callback) {
  let i, len
  if (util.isArray(obj)) {
    for (i = 0, len = obj.length; i < len; i++) {
      if (callback(obj[i], i, obj) === false) {
        break
      }
    }
  } else {
    for (i in obj) {
      if (callback(obj[i], i, obj) === false) {
        break
      }
    }
  }
  return obj
}

util.each(
  ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'],
  function(name) {
    util['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']'
    }
  }
)

util.toArray = function(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

util.toNumber = function(value) {
  if (typeof value !== 'string') {
    return value
  } else {
    const parsed = Number(value)
    return isNaN(parsed) ? value : parsed
  }
}

util.convertArray = function(value) {
  if (util.isArray(value)) {
    return value
  } else if (util.isPlainObject(value)) {
    // convert plain object to array.
    const keys = Object.keys(value)
    let i = keys.length
    const res = new Array(i)
    let key
    while (i--) {
      key = keys[i]
      res[i] = {
        $key: key,
        $value: value[key]
      }
    }
    return res
  } else {
    return value || []
  }
}

function multiIndex(obj, is) {
  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
  return is.length ? multiIndex(obj[is[0]], is.slice(1)) : obj
}

util.getPath = function(obj, is) {
  // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
  return multiIndex(obj, is.split('.'))
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'
util.isPlainObject = function(obj) {
  return toString.call(obj) === OBJECT_STRING
}

export default util
