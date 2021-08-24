/**
 * @description: 工具方法，公共的方法处理
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-03 11:36:36
 * @LastEditTime: 2021-03-03 11:36:36
 * @LastEditors: 小康
 */

function getLabel(labels) {
  const result = []
  for (let label of labels) {
    result.push({
      name: label.name,
      color: '#' + label.color
    })
  }
  return result
}

function getBody(body) {
  const item = {}
  // 需要匹配的键名
  const keys = [
    'name',
    'link',
    'avatar',
    'descr',
    '--primary-color',
    'border-width',
    'border-style',
    '--primary-rotate',
    'animation',
    'img_animation',
    'card_style',
    'screenshot'
  ]
  for (let key of keys) {
    item[key] = _getInfo(body, key)
  }
  return item
}

function _getInfo(body, regs) {
  const reg = new RegExp(String.raw`${regs}:[^\n]*\n`)
  const repReg = new RegExp(String.raw`(${regs}:[\s]*|[\r\n]*)`, 'g')
  let info = ''
  body = body.match(reg)
  if (body && body.length > 0) {
    info = body[0].replace(repReg, '')
  }
  return info
}
module.exports = {
  getLabel,
  getBody
}
