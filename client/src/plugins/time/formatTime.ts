import dayjs from 'dayjs'
import 'dayjs/locale/vi'

function formatTime(value, format, locale) {
  if (!value) return null
  else {
    format = format || 'LL'
    locale = locale || 'en'
    return dayjs(value)
      .locale(locale)
      .format(format)
  }
}

export default formatTime
