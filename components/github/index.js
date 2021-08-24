/**
 * @description: 获取GitHub友链
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-03 10:45:28
 * @LastEditTime: 2021-03-03 10:45:28
 * @LastEditors: 小康
 */

const Friend = require('../base')

class GetFriend extends Friend {
  constructor() {
    super()
  }

  // 获取所有处理数据并返回
  async getData() {
    const issue_data = []
    if (this.github.owner && this.github.repo) {
      const rawData = await super.getFriendRawData(
        `https://api.github.com/repos/${this.github.owner}/${this.github.repo}/issues`,
        this.github.access_token,
        this.github.config
      )
      console.log('GitHub中你传入的自定义字段为:', [
        ...this.regKeys,
        ...this.github.regKeys
      ])
      const tempList = super.analyzeIssue(rawData, [
        ...this.regKeys,
        ...this.github.regKeys
      ])
      issue_data.push(...tempList)
      console.log('GitHub爬取完成！')
    } else {
      console.log('没有设置GitHub相关的配置')
    }
    return issue_data
  }
}

module.exports = new GetFriend()
