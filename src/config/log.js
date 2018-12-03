/**
 * Created by wp on 2017-03-13.
 */
import _ from "lodash";
import path from "path";
import appConfig from "./config";

const log_path = path.join(__dirname, '../../logs');  //配置目标路径 logs
const config = {
    appenders: [
        {
            type: "file",
            filename: "app.log",
            maxLogSize: 10485760,
            pattern: "-yyyy-MM-dd",
            numBackups: 5,
            category: "app"
        },
        {
            type: "file",
            filename: "debug.log",
            maxLogSize: 10485760,
            pattern: "-yyyy-MM-dd",
            numBackups: 5,
            category: "debug"
        },
        {
            type: "file",
            filename: "errors.log",
            maxLogSize: 10485760,
            pattern: "-yyyy-MM-dd",
            numBackups: 5,
            category: "error"
        }
    ]
};

if (appConfig.env === "development") {
    config.appenders.push({
        type: "console"
    });
}else if(appConfig.env === 'production'){
    config.appenders = _.filter(config.appenders, {filename: "errors.log"})
}

module.exports = {path: log_path, config};

