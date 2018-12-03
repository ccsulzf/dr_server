import Koa from 'koa';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import config from './config/config';
import {
    orm,
    router
} from './lib/index';
import RestQL from 'roas-restql';
import cors from "koa-cors";
import path from "path";
import logMiddle from "./middleware/log";
import bodyHandlerMiddle from "./middleware/body-handler";
import cacheMiddle from './middleware/cache';
import xload from "./middleware/xload";
import IO from "koa-socket.io";
import http from "http";

const app = new Koa();
const io = new IO({
    namespace: '/'
});

app.config = config;
app.keys = [config.secretKeyBase];

// not serve static when deploy
if (config.serveStatic) {
    app.use(convert(require('koa-static')(__dirname + '/public')));
}

app.use(xload(app, {
    path: path.resolve(__dirname, '../public/assets/images/avatar'),
    upload: {
        encoding: 'utf-8',
        maxFieldsSize: 2 * 1024 * 1024,
        maxFields: 1000
    }
}));

app.use(logMiddle());
// body和错误处理必须是第一个use
app.use(bodyHandlerMiddle((err, ctx) => {
    ctx.log.error(err);
}));

//添加rest api支持
const restql = new RestQL(orm.sequelize.models);
app.use(convert(json()));
app.use(bodyparser());
app.use(cacheMiddle());
app.use(cors());
// app.use(dataDecodeMiddle());
app.use(router().routes(), router().allowedMethods());
app.use(restql.routes());

if (process.argv[2] && process.argv[2][0] == 'c') {
    const repl = require('repl');
    repl.start({
        prompt: '> ',
        useGlobal: true
    }).on('exit', () => {
        process.exit();
    });
} else {
    (async() => {
        const server = http.createServer(app.callback());
        const connection = await orm.sequelize.sync();
        if (connection) {
            server.listen(config.socketPort, 'localhost', () => {
                console.log('Connect to the database and the listener port:' + config.socketPort);
            });
            io.start(server);
            io.use((ctx, next)=> {
                router(ctx, next);
            });
            app.listen(config.port, () => {
                console.log('Connect to the database and the listener port:' + config.port);
            });
        }
    })();
}


export default app;