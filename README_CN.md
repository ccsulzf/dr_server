# roas.js

基于Koa2+Sequelize+ES6的Ruby on Rails风格的后台服务开发框架。

这个项目就像Ruby on Rails项目:

* MVC
* 数据库(mysql、mssql...)
* ORM(sequelize)
* 数据迁移(sequelize-cli)
* 测试(mocha)
* 代码检查(eslint)
* Koa中间件(koa-bodyparser、koa-convert、koa-json、koa-logger、koa-router、koa-static)
* Rest API(roas-restql)

## node&npm版本要求

* node __^5.0.0__
* npm __^3.0.0__

## 如何安装

```bash
 安装nodejs
 安装mysql或者mssql的nodejs驱动模块
 创建数据库:
 开发数据库 { database: 'roas_dev', username: 'roas_dev', password: 'roas_dev' }
 测试数据库 { database: 'roas_test', username: 'roas_test', password: 'roas_test' }
 复制这个项目作为模板
```

## 主要特性

* [koa2](https://github.com/koajs/koa/tree/v2.x)
* [koa-bodyparser](https://github.com/koajs/bodyparser)
* [koa-router](https://github.com/alexmingoia/koa-router)
* [koa-logger](https://github.com/koajs/logger)
* [Sequelize](http://docs.sequelizejs.com/)
* [Nodemon](http://nodemon.io/)
* [Mocha](https://mochajs.org/)
* [Babel](https://github.com/babel/babel)
* [ES6]
* [ESLint](http://eslint.org/)

## 项目结构

```
├─ src
├── api-MVC结构文件夹
│   ├── controllers-控制层
│   ├── models-实体层
│   ├── routes-路由层
│   ├── services-服务层
├── lib-公共封装库
├── middleware-自定义中间件文件夹
├── config
│   ├── config.js-配置文件
│   ├── database.js-数据库配置文件
│   └── env
│       ├── test.js-测试环境配置
│       ├── development.js-开发环境配置
│       └── production.js-正式部署配置
├── app.js-服务入口文件
├─ db
│   └─ migrations-数据迁移脚本文件夹
├─ index.js-入口文件
├─ .babelrc-babel配置文件
├─ .sequelizerc-Sequelize配置文件
├─ package.json-项目配置文件
├─ public-静态资源文件夹
├─ log-日志文件夹
└─ test
	├─ controllers-控制器测试用例
	├─ middlewares-中间件测试用例
	├─ models-实体测试用例
	├─ services-服务测试用例
	├─ bootstrap.test.js-测试入口文件
	└─ mocha.opts-测试配置文件
```

### 项目说明

##构架思路
```
1、以Koa2为Web框架，通过引入中间件支持http的请求和相应的处理（router、body、json、logger）
2、集成Sequelize支持ORM功能、sequelize-cli支持数据迁移
3、添加Babel支持ES6,主要是class、async await、import export等的支持，实现代码简单的压缩、混淆
4、通过nodemon运行服务和监测文件修改
5、引入Mocha做代码的单元测试，主要包括：controller、model、service、middleware的测试
6、封装roas-restql实现model的Rest API的CRUD操作
7、封装roas-mount实现动态加载controller、router、service
8、引入node-cache模块，添加cache中间件,支持本地内存的对象缓存
```

##主要说明
```
1、lib\index.js，动态加载controller、router、service，动态注册路由与控制器，加载ORM
2、lib\router.js，具体注册路由与控制器进行绑定的代码实现
3、lib\orm.js，具体集成Sequelize、初始化ORM、动态绑定model代码实现
```

## 使用

```
npm install
npm run db:migrate
# 开发环境执行下面命令运行服务
npm run start
# 运行lint进行代码检查
npm run lint
# 运行测试
npm run test
# linux环境部署运行命令
NODE_ENV=production npm run db:migrate
npm run pm2
```

## 开发环境运行

```
$ npm run start
# 访问地址`http://localhost:3000/
```

