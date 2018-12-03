/**
 * Created by wp on 2017-06-14.
 */

module.exports = routerSocket => async (ctx, next) => {
    let path, params, controller, action;
    for (let mapping in global.$routes) {
        for (let url in global.$routes[mapping]) {
            path = url.substr(url.indexOf(' ')+1,url.length-1);
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
                console.log(`Route for controller is not found111： ${url}`);
                continue;
            }

            if (url.startsWith('WS ') || url.startsWith('ws ')) {
                console.info(path);
                console.info(action);
                ctx.socket.on(path, action);
            } else if(url.startsWith('GET ') || url.startsWith('get ') || url.startsWith('POST ') || url.startsWith('post ') || url.startsWith('PUT ') || url.startsWith('put ') || url.startsWith('DELETE ') || url.startsWith('delete ')){

            }
            else {
                console.log(`Don't support routing：${url}`);
            }
        }
    }
};