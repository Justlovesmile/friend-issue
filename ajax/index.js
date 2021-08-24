/**
 * @description: ajax请求函数
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-03 10:26:13
 * @LastEditTime: 2021-03-03 10:26:13
 * @LastEditors: 小康
 */

const axios = require('axios')

/**
 * 封装请求api的函数
 * @author 小康
 * @date 2021-03-03
 * @param {string} url 请求的url
 * @param {string} token token认证
 * @param {object} data 请求的数据
 * @param {string} method 请求方法 默认GET
 * @returns {any}
 */
function request(url, token, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步请求
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data,
        headers: !token ? {} : { Authorization: 'Bearer ' + token }
      })
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then((response) => {
        // 2. 成功调用resolve
        resolve({ headers: response.headers, data: response.data })
      })
      .catch((error) => {
        // 3. 失败不调用reject，而是提示异常信息
        console.log(error)
        console.log(error.message)
      })
  })
}
module.exports = request
