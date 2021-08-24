## 项目介绍

此项目的作用主要是为了爬取GitHub、gitee的issue友链，并将爬取到的文件保存到GitHub，发布到NPM，方便各种CDN引用。文件JSON格式如下：

```json
{
  "gitee":[
    {
      "number": "I1RH4I",
      "html_url": "https://gitee.com/antmoe/friend/issues/I1RH4I",
      "state": "open",
      "title": "https://www.lete114.top",
      "body": {
        "name": "Lete乐特",
        "link": "https://www.lete114.top",
        "avatar": "https://www.lete114.top/img/avatar.png",
        "descr": "人生只有一次，大胆的生活！！",
        "--primary-color": "linear-gradient( 135deg, #FFF886 10%, #F072B6 100%)",
        "border-width": "1px",
        "border-style": "solid",
        "--primary-rotate": "0deg",
        "animation": "link_custom1 1s infinite alternate",
        "img_animation": "auto_rotate_left .5s linear infinite",
        "card_style": "card",
        "screenshot": "https://7.dusays.com/2021/01/12/42c99956eac68.png"
      },
      "label": [
        {
          "name": "乐特专属",
          "color": "#1B1C1D"
        }
      ],
      "created_at": "2020-08-14T21:30:56+08:00",
      "updated_at": "2021-03-03T20:52:28+08:00"
    }
  ],
  "github":[],
  "date":"1614788300077"
}
```

> 真实文件链接：[npm中真实的文件链接](https://unpkg.com/myfriend/friend.json)，[Gitee的友链](https://gitee.com/antmoe/friend/issues)，[Github的友链](https://github.com/DreamyTZK/friend/issues)

## 快速开始

1. 打开[friend-spider](https://github.com/DreamyTZK/friend-spider)项目，点一个start。

   ![image-20210304090127419](https://rmt.dogedoge.com/fetch/tzk/storage/20210304090134.png?w=1280&fmt=jpg)

2. 然后点击方便的Fork，到自己的仓库中配置环境变量。

   ![image-20210304090247151](https://file.acs.pw/picGo/2021/3/4/2fd1570191ae585972796521a0bfe444.jpeg)

3. 点击Actions，打开actions的设置

   ![image-20210304093752589](https://file.acs.pw/picGo/2021/3/4/9be568183a0c633ecd2684e77fb758b7.png)

4. 这时点击一下点击一下issue，如果没有请到设置中开启issue

   ![image-20210304093919237](https://file.acs.pw/picGo/2021/3/4/618aee94f681a4f344bfd2218dcfaa18.png)

5. 此时点击一下自己仓库的start或者在自己仓库发表一个issue后等待actions运行结果即可。

   ![image-20210304094424699](https://file.acs.pw/picGo/2021/3/4/cea174db2ebc81e194764524ec44079d.png)

6. 项目爬取完成后会将爬取结果上传到改项目下`friend`分支下，如果你设置了`NPM_NAME`和`NPM_TOKEN`那么也会上传到npm包下。

   > 访问可以通过`unpkg`和`jsd`或者使用[小冰](https://github.com/Zfour/friends_link_list_api)的API。
   >
   > unpkg的格式为：`https://unpkg.com/{NPM包名}/friend.json`，这个链接每5分钟刷新一次（不要指定版本号）。

   ```
   # 请求链接 '不能少
   # 必要字段为 用户名
   # 其中仓库名如果不填默认为friends,分支如果不填默认为master
   https://{项目域名}/api?repo='{仓库名}'&user='{用户名}'&branch='{分支}'
   
   # 例子
   # https://friends-link-list-api.vercel.app/api?user='Zfour'
   # https://friends-link-list-api.vercel.app/api?repo='hexo-issuse-friends'&user='Zfour'
   # https://friends-link-list-api.vercel.app/api?repo='hexo-issuse-friends'&user='Zfour'&branch='master'
   ```

   

## 环境变量设置

### 推荐设置的环境变量

> 这里我推荐你需要填写的环境变量，包含必选和不必选

|         名称         |                   含义                    |         示例          |
| :------------------: | :---------------------------------------: | :-------------------: |
|      `NPM_NAME`      |                npm包的名称                |      `myfriend`       |
|     `NPM_TOKEN`      |               npm包的token                |        `xxxxx`        |
| `GITEE_ACCESS_TOKEN` | 用户Token，用于防止频繁访问接口受限的问题 |        `xxxxx`        |
|    `GITEE_OWNER`     |                仓库的主人                 |       `antmoe`        |
|     `GITEE_REPO`     |                  仓库名                   |       `friend`        |
|  `GH_ACCESS_TOKEN`   | 用户Token，用于防止频繁访问接口受限的问题 |        `xxxxx`        |
|      `GH_OWNER`      |                仓库的主人                 |      `DreamyTZK`      |
|      `GH_REPO`       |                  仓库名                   |       `friend`        |
|      `REGKEYS`       |             通用额外字段匹配              | `screenshot,keywords` |

### 通用设置

> 这里的变量会影响到GitHub仓库、gitee仓库的爬取规则。

- `REGKEYS`

  这个变量用于控制额外的匹配字段。多个用英文逗号隔开。

  ```
  --primary-color,border-width,border-style,--primary-rotate,animation,img_animation,card_style,screenshot
  ```
  
  > 默认只取`name`、`link`、`avatar`、`avatar`，如果你使用了[小康的友链butterfly-friend](https://www.yuque.com/kdoc/bf/friend)或者你友链定义的字段在默认中不存在那么强烈建议你填写到此字段；如果你的gitee仓库与GitHub仓库友链字段不同，需要分别处理，那么建议你填写`GITEE_REGKEYS`和`GH_REGKEYS`字段
  
- `NPM_NAME`

  npm包的名称，确保唯一即npm上搜不到这个包名

- `NPM_TOKEN`

  npm的token，用于发布包

### gitee仓库

> 这里的变量只会影响到gitee仓库的爬取规则

|        变量名        |                             含义                             |  示例值   |
| :------------------: | :----------------------------------------------------------: | :-------: |
| `GITEE_ACCESS_TOKEN` |          用户Token，用于防止频繁访问接口受限的问题           |  `xxxxx`  |
|    `GITEE_OWNER`     |                          仓库的主人                          | `antmoe`  |
|     `GITEE_REPO`     |                            仓库名                            | `friend`  |
|    `GITEE_STATE`     | 需要查找的仓库状态，默认为`all`，即全部状态。<br/>`open`(开启的) `progressing`(进行中) `closed`(关闭的) `rejected`(拒绝的) `all`(全部) |   `all`   |
|     `GITEE_SORT`     | 排序依据，创建时间(`created`)，更新时间(`updated`)。默认: `created` | `created` |
|  `GITEE_DIRECTION`   |        排序规则，升序(`asc`)，降序(`desc`)，默认`asc`        |   `asc`   |
|   `GITEE_REGKEYS`    | 与通用里`REGKEYS`相同，只不过这个变量只会影响到gitee仓库的爬取规则 |           |

### GitHub仓库

> 这里的变量只会影响到GitHub仓库的爬取规则

|      变量名       |                             含义                             |  示例值   |
| :---------------: | :----------------------------------------------------------: | :-------: |
| `GH_ACCESS_TOKEN` |          用户Token，用于防止频繁访问接口受限的问题           |  `xxxxx`  |
|   `GH_OWNER`   |                          仓库的主人                          | `DreamyTZK` |
|   `GH_REPO`    |                            仓库名                            | `friend`  |
|   `GH_STATE`   | 需要查找的仓库状态，默认为`all`，即全部状态。<br/>`open`(开启的) `closed`(关闭的) `all`(全部) |   `all`   |
|   `GH_SORT`    | 排序依据，`created`(创建时间), `updated`(更新时间), `comments`(评论数)。默认: `created` | `created` |
| `GH_DIRECTION` |        排序规则，升序(`asc`)，降序(`desc`)，默认`asc`        |   `asc`   |
|  `GH_REGKEYS`  | 与通用里`REGKEYS`相同，只不过这个变量只会影响到GitHub仓库的爬取规则 |           |

## 部分环境变量的获取

参考：[https://www.antmoe.com/posts/cdc580cd/](https://www.antmoe.com/posts/cdc580cd/)



## 码云仓库通过webhook触发actions

> 参考[小冰](https://zfe.space/)的API即可，项目地址：https://github.com/Zfour/yuque_vercel_webhook_api

```
https://yuque-vercel-webhook-api.vercel.app/api?
token='{填写你的github私钥}'&
user='{填写你的github用户名}'&
source='{填写你的github仓库地址}'

示例：
https://yuque-vercel-webhook-api.vercel.app/api?token='8888888888'&user='Zfour'&source='my-blog-source-file'
将这个URL路径作为触发链接，在gitee中进行配置。
```

![image-20210304155107750](https://file.acs.pw/picGo/2021/3/4/763d3a78cbc0cad0a5a23c691beadce8.png)

## GitHub触发webhook

**将项目clone到你的仓库中，在这个仓库发布issue就会自动触发actions。**



如果你的友链仓库与本项目没在一个仓库，那么可以在你友链仓库添加一个actions任务。例如：

```yaml
# This is a basic workflow to help you get started with Actions

name: Async

# Controls when the action will run. 
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  issues:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Async
        run: |
          curl --location --request POST 'https://api.github.com/repos/iServes/actions-friend-spider/dispatches'  --header 'Authorization: Bearer ${{ secrets.GH_ACCESS_TOKEN }}' --header 'Content-Type: application/json' --data-raw '{"event_type":"Gitee Webhook"}'
```

然后记得添加一个名为`GHGH_ACCESS_TOKEN`的`secrets`