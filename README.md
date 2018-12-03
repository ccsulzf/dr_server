# roas.js

A Web App like Ruby on Rails with Koa2, ES6 and Sequelize.

This project is like Ruby on Rails Project:

* MVC
* Database (mysql、mssql...), ORM(sequelize)
* migration(sequelize-cli)
* Testing (mocha)
* Lint (eslint)
* middleware
* rest server side

## Requirements

* node __^5.0.0__
* npm __^3.0.0__

## How to Install

```bash
 install nodejs
 install mysql and mssql
 create database:
 for development { database: 'roas_dev', username: 'roas_dev', password: 'roas_dev' }
 for test { database: 'roas_test', username: 'roas_test', password: 'roas_test' }
 clone this project
```

## Features

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

## Structure

```
├─ src
├── api
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
├── lib
├── middleware
├── config
│   ├── config.js
│   ├── database.js
│   └── env
│       ├── test.js
│       ├── development.js
│       └── production.js
├── app.js
├─ db
│   └─ migrations
├─ index.js
├─ .babelrc
├─ .sequelizerc
├─ package.json
├─ public
├─ log
└─ test
	├─ controllers
	├─ middlewares
	├─ models
	├─ services
	├─ bootstrap.test.js
	└─ mocha.opts
```

## Usage

```
npm install
npm run db:migrate
# run for development, it start app server
npm run start
# run the lint
npm run lint
# run test
npm run test
# deploy
NODE_ENV=production npm run db:migrate
npm run pm2
```

## Start development environtment

```
$ npm run start
# Visit `http://localhost:3000/
```

## License
[MIT](https://github.com/libinqi/kails/roas/master/LICENSE.txt)
