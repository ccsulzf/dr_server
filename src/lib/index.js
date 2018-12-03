'use strict';
import path from 'path';
import mount from 'roas-mount';

import Router from './router';
import ORM from './orm';

/*
 *加载控制器
 * param:dir(控制器文件目录,默认路径为当前项目src/api/controllers)
 */
global.$controllers = mount(path.join(__dirname, '../', 'api/controllers'));

/*
 *加载路由
 * param:dir(路由文件目录,默认路径为当前项目src/api/routes)
 */
global.$routes = mount(path.join(__dirname, '../', 'api/routes'));
/*
 *加载服务
 * param:dir(服务文件目录,默认路径为当前项目src/api/services)
 */
global.$services = mount(path.join(__dirname, '../', 'api/services'));
Object.keys(global.$services).forEach(key => {
    global[key] = global.$services[key];
});

/*
 *动态注册路由与控制器
 */
// const router = Router();

/*
 *加载ORM与注册实体、初始化数据库
 *param:dir(实体文件目录,默认路径为当前项目src/api/models)
 *param:schema
 */
const orm = ORM([path.join(__dirname, '../', 'api/models')]);

module.exports = {
    router: Router,
    orm: orm
};


