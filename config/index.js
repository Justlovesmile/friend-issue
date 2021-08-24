/**
 * @description: 配置文件入口
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-03 09:43:48
 * @LastEditors: 小康
 */
module.exports = {
  // 匹配字段
  regKeys: process.env.REGKEYS ? process.env.REGKEYS.split(',') : [],
  // gitee仓库相关配置
  gitee: {
    access_token: process.env.GITEE_ACCESS_TOKEN, // 用户通行token，防止接口调用过度
    owner: process.env.GITEE_OWNER, // 用户名
    repo: process.env.GITEE_REPO, // 仓库名

    config: {
      state: process.env.GITEE_STATE || 'all', // open(开启的) progressing(进行中) closed(关闭的) rejected(拒绝的) all(全部)

      sort: process.env.GITEE_SORT || 'created', // 排序依据 创建时间(created)，更新时间(updated)。默认: created

      direction: process.env.GITEE_DIRECTION || 'asc', // 排序方式: 升序(asc)，降序(desc)。默认: asc

      page: 1, // 默认请求第一页

      per_page: 100 // 默认请求数量为 100（最大值）
    },
    regKeys: process.env.GITEE_REGKEYS
      ? process.env.GITEE_REGKEYS.split(',')
      : []
  },
  github: {
    access_token: process.env.GH_ACCESS_TOKEN, // 用户通行token，防止接口调用过度
    owner: process.env.GH_OWNER, // 用户名
    repo: process.env.GH_REPO, // 仓库名

    config: {
      state: process.env.GH_STATE || 'all', // open(开启的) closed(关闭的) all(全部)

      sort: process.env.GH_SORT || 'created', // 排序依据 created(创建时间), updated(更新时间), comments(评论数)。默认: created

      direction: process.env.GH_DIRECTION || 'asc', // 排序方式: 升序(asc)，降序(desc)。默认: asc

      page: 1, // 默认请求第一页

      per_page: 100 // 默认请求数量为 100（最大值）
    },
    regKeys: process.env.GH_REGKEYS ? process.env.GH_REGKEYS.split(',') : []
  }
}
