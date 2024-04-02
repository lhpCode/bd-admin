## 简介

hp-admin-cli是一款能根据需求快速配置vue后台管理模板的脚手架，内置使用vue3 + vue-router + pinia + axios 其他功能均可自定义。

- 极简操作，安装就可使用
- 轻装上阵，模块功能自己决定是否使用，可以快速修改为自己想要的模板。
- 自定义技术栈 : vue3 +elementUI or vue3+Ant Design 由你搭配
- 自定义后台管理功能模块：权限配置 or 多语言 or 动态换肤 项目功能由你选择
- 代码规范可配置：自选是否在项目中应用eslint 和Prettier

## 下载

```
npm i hp-admin-cli -g
```

## 使用方法

```
admin-cli create <name>
```

## 固定功能

- [x] 多主题：内置多种主题搭配，自由切换
- [x] 权限管理：内置页面权限（动态路由）、按钮权限
- [x] 多级路由

## 功能

- 框架技术自提
  - [x] 语言选择： typeScript or javaScript
  - [x] ui库选择 ：element Plus or Ant Design
  - [x] css扩展语言选择: less or scss
  - [x] 代码规范:eslint 和Prettier
  - [x] 多语言：使用i18配置多语言
- 框架模块自提
  - [x] echarts
  - [x] three.js



### 操作示例

![image-20240402115039380](C:\Users\java\AppData\Roaming\Typora\typora-user-images\image-20240402115039380.png)

### 生成项目 目录结构

```
bd-admin
├─ .env.development    # 开发环境
├─ .env.production     # 生产环境
├─ .eslintrc.cjs       # eslint
├─ README.md          
├─ dist               # 打包dist
├─ public             # 静态资源
├─ src                # 源码
│  ├─ api             # 接口请求
│  ├─ components      # 公共组件
│  ├─ config          # 全部配置
│  	  └─ white-list.ts# 路由白名单
│  ├─ layouts         # 全局Layout
│  ├─ lang        	  # 国际化
│  ├─ icons        	  # 图标
│  ├─ hook        	  # vue组合式函数
│  ├─ router          # 路由
│  ├─ store           # 全局store管理
│  ├─ styles          # 全局样式
│  ├─ utils           # 全局公共方法
│  └─ views           # 所有业务页面
├─ tsconfig.json      # ts 编译配置
└─ vue.config.js      # vue-cli 配置
```

![image-20240402114639402](C:\Users\java\AppData\Roaming\Typora\typora-user-images\image-20240402114639402.png)

![image-20240402114731744](C:\Users\java\AppData\Roaming\Typora\typora-user-images\image-20240402114731744.png)
