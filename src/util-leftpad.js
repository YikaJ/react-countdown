/**
 * leftpad 用于填充字符串，递归实现
 * @param  {String} str [需要填充的字符串]
 * @param  {Number} len [填充后的长度]
 * @param  {String} ch  [填充字符，默认为空格]
 * @return {String}     [填充后的文字]
 */
export default function leftPad(str, len, ch) {
  str = String(str)
  ch = String(ch)

  if(str.length >= len) return str
  if(!ch && ch != 0) ch = ' '

  return leftPad(ch + str, len, ch)
}
