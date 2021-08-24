/**
 * @description: 获取码云友链
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
    if (this.gitee.owner && this.gitee.repo) {
      const rawData = await super.getFriendRawData(
        `https://gitee.com/api/v5/repos/${this.gitee.owner}/${this.gitee.repo}/issues`,
        this.gitee.access_token,
        this.gitee.config
      )
      console.log('gitee中你传入的自定义字段为:', [
        ...this.regKeys,
        ...this.gitee.regKeys
      ])
      const tempList = super.analyzeIssue(rawData, [
        ...this.regKeys,
        ...this.gitee.regKeys
      ])
      issue_data.push(...tempList)
      console.log('gitee爬取完成！')
    } else {
      console.log('没有设置gitee相关的配置')
    }
    return issue_data
  }
}

module.exports = new GetFriend()
