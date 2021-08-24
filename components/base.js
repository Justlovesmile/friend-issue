/**
 * @description: 基类
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-03 13:51:49
 * @LastEditTime: 2021-03-03 13:51:50
 * @LastEditors: 小康
 */
const { gitee, github, regKeys } = require('../config')
const request = require('../ajax')
class Friend {
  constructor() {
    this.total_page = 1
    this.gitee = gitee
    this.github = github
    this.regKeys = regKeys
  }
  // 处理issue数据data
  analyzeIssue(datas, userKeys) {
    // 最终返回的数据
    const result = []
    for (let data of datas) {
      // 数字（相当于issue的id，唯一）
      const number = data.number
      // 当前issue地址
      const html_url = data.html_url
      // 状态
      const state = data.state
      // issue的标题
      const title = data.title
      // issuse的主体（body）
      const body = this.getBody(data.body, [...this.regKeys, ...userKeys])
      // 标签
      const label = this.getLabel(data.labels)
      // 创建时间
      const created_at = data.created_at
      // 更新时间
      const updated_at = data.updated_at

      result.push({
        number,
        html_url,
        state,
        title,
        body,
        label,
        created_at,
        updated_at
      })
    }
    return result
  }
  // 获取api的原始数据
  async getFriendRawData(url, token, config = {}) {
    const result = []
    // 默认请求第一个数据
    let flag = true,
      page = 1
    while (flag) {
      const friendList = await request(url, token, { ...config, page })
      if (friendList.data.length > 0) {
        result.push(...friendList.data)
        page++
      } else {
        flag = false
      }
    }
    return result
  }
  // 获取标签
  getLabel(labels) {
    const result = []
    for (let label of labels) {
      result.push({
        name: label.name,
        color: '#' + label.color
      })
    }
    return result
  }
  // 获取body
  getBody(body, userKeys) {
    const item = {}
    // 需要匹配的键名
    const keys = ['name', 'link', 'avatar', 'descr', ...userKeys]
    for (let key of keys) {
      item[key] = this._getInfo(body, key)
    }
    return item
  }
  // 私有方法，匹配配置项
  _getInfo(body, regs) {
    const reg = new RegExp(String.raw`${regs}:[^\n]*\n`)
    const repReg = new RegExp(String.raw`(${regs}:[\s]*|[\r\n]*)`, 'g')
    let info = ''
    body = body.match(reg)
    if (body && body.length > 0) {
      info = body[0].replace(repReg, '')
    }
    return info
  }
}

module.exports = Friend
