import crypto from "crypto";

module.exports = callback => async(ctx, next) => {
    try {
        await next();

        if (404 == ctx.status) ctx.throw(404, '请求的路径或资源不存在');

        let data = null;

        let md5 = crypto.createHash('md5');
        if (ctx.body && typeof ctx.body == 'string') {
            try {
                data = JSON.parse(ctx.body);
            } catch (err) {
                data = ctx.body;
            }
        }

        // let result = {
        //     data: data,
        //     error: {
        //         code: 0,
        //         message: 'success'
        //     }
        // };
        // result = JSON.stringify(result);
        // md5.update(result);
        // let md5Hex = md5.digest('hex');
        //
        // ctx.body = md5Hex + result;
        ctx.body = {
            data: data,
            error: {
                code: 0,
                message: 'success'
            }
        };
        ctx.status = 200;
        return true;
    } catch (err) {
        ctx.body = {
            data: null,
            error: {
                code: err.code || err.status || 500,
                message: err.message || '服务发生未知错误'
            }
        };

        if (callback) {
            callback(err, ctx);
        }

        ctx.status = 200;
    }
};