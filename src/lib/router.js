'use strict';

import Router from 'koa-router';

const router = Router();

export default function (ctx, next) {
    let path, params, controller, action;

    for (let mapping in global.$routes) {
        for (let url in global.$routes[mapping]) {
            path = url.substr(url.indexOf('/'), url.length - 1);
            params = global.$routes[mapping][url].split('.');
            // 获取控制器与函数
            if (params && params.length == 2) {
                controller = global.$controllers[params[0]];
                if (controller && controller[params[1]]) {
                    action = controller[params[1]];
                } else {
                    action = null;
                }
            } else {
                console.log(`Route parameter pattern is not available：${url}`);
            }

            if (!action) {
                console.log(`Route for controller is not found： ${url}`);
                continue;
            }

            if (url.startsWith('GET ') || url.startsWith('get ')) {
                router.get(path, action);
            } else if (url.startsWith('POST ') || url.startsWith('post ')) {
                router.post(path, action);
            } else if (url.startsWith('PUT ') || url.startsWith('put ')) {
                router.put(path, action);
            } else if (url.startsWith('DELETE ') || url.startsWith('delete ')) {
                router.delete(path, action);
            } else if (url.startsWith('WS') || url.startsWith('ws')) {
                path = url.replace('WS ', '').replace('ws ', '');
                if (ctx)ctx.socket.on(path, action);
            } else {
                console.log(`Don't support routing：${url}`);
            }
        }
    }

    return router;
}