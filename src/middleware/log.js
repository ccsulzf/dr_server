/**
 * Created by wp on 2017-03-14.
 */
import fs from "fs";
import log4js from "log4js";
import log from "../config/log";

module.exports = ()=> {
    try {
        if (!fs.existsSync(log.path)) {
            fs.mkdirSync(log.path);
        }
    } catch (err) {
        if (err.code !== 'EEXIST') {
            console.error('日志文件路径创建失败: ', err);
            process.exit(1)
        }
    }

    log4js.configure(log.config, {cwd: log.path});

    const loggerError = log4js.getLogger("error");
    const loggerDebug = log4js.getLogger("debug");
    const loggerInfo = log4js.getLogger("app");

    const error =  (value) => {
        loggerError.error(value);
    };

    const debug = (value) => {
        loggerDebug.debug(value);
    };

    const info = (value) => {
        loggerInfo.info(value);
    };

    const logMiddle = async (ctx, next) =>{
        try {
            ctx.log = {
                info: info,
                debug: debug,
                error: error
            };

            global.Log = ctx.log;

            await next();
        } catch (err) {
            error(err);
        }
    };
    return logMiddle;
};

