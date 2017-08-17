/*
* @Author: Administrator
* @Date:   2017-07-28 15:12:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-31 14:21:16
*/

let format = (value) => {
  return value >= 10 ? value : '0' + value
}
/**
 * 时间格式化
 */
export const date = (time, type) => {
  let result
  if (time === '') {
    return ''
  }
  if (time === true) {
    return '是'
  }
  if (isNaN(time) || !isNaN(time) && time.length < 13) {
    return time
  }
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  switch (type) {
    case 0: // 01-05
      result = `${format(month)}-${format(day)}`
      break
    case 1: // 11:12
      result = `${format(hours)}-${format(minutes)}`
      break
    case 2: // 2015-01-05
      result = `${year}-${format(month)}-${format(day)}`
      break
    case 3: // 2015-01-05 11:12
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`
      break
    case 4: // 2015-01-05 11:12:06
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`
      break
  }
  return result
}
