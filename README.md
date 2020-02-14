### O2System_Front

#### 开发须知
> 本项目由yarn代替npm

- 下载所需包
```
yarn install
```

- 本地启动项目
```
yarn run serve
```

- 编译项目
```
yarn run build
```

* 线上地址
> http://114.55.169.130:3000/

* easy mock
> http://111.229.5.125:12306/  
> ID: admin  
> PW: 123456

* UI(ant-design-vue)
> https://www.antdv.com/docs/vue/introduce-cn/

* 脚手架(ant-design-pro-vue)
> https://github.com/sendya/ant-design-pro-vue


#### 目录结构
```
├── public
│   └── logo.png             # LOGO
|   └── index.html           # Vue 入口模板
├── src
│   ├── api                  # Api ajax 等
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── config               # 项目基础配置，包含路由，全局设置
│   ├── core                 # 项目引导, 全局配置初始化，依赖包引入等
│   ├── layouts              # 布局
│   ├── locales              # 国际化资源
│   ├── mock                 # 数据模拟
│   ├── router               # Vue-Router
│   ├── store                # Vuex
│   ├── utils                # 工具库
│   ├── views                # 业务页面入口和常用模板
│   ├── App.vue              # Vue 模板入口
│   └── main.js              # Vue 入口 JS
│   └── permission.js        # 路由守卫(路由权限控制)
└── package.json
```

#### 国际化语言位置
- src\layouts\UserLayout.vue
- src\components\tools\UserMenu.vue

#### 前端规范篇

**1. 整体规范**
* 项目中使用`editorconfig`来设置，整体文件编码格式，空格，回车符等。请下载插件使用。（各个编辑器都有该插件）
* 项目中使用`eslint`来检测javascript代码。

**2. 起名**
* 变量，函数名用`驼峰式（例：userName）`
* 国际化语言用`变量名+横岗+小写（例：userName-placeholder）`
* class,id`（例：table-list）`