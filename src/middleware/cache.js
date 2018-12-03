import config from '../config/config';
import cache from 'node-cache';

module.exports = function (options) {
    const middleOptions = options || {};
    const prefix = middleOptions.prefix || 'roa-cache:';
    const expire = middleOptions.expire || config.maxCache;

    const nodeCache = new cache({stdTTL: expire, checkperiod: 120});

    const setCache = function (key, value, cacheOptions) {
        if (value == null) {
            return;
        }
        const currentOptions = cacheOptions || {};
        key = prefix + key;
        const tty = currentOptions.expire || expire;
        nodeCache.set(key, value, tty);
    };

    const getCache = function (key) {
        key = prefix + key;
        let data = nodeCache.get(key);
        if (data && data != undefined) {
            return data;
        }
        return null;
    };

    const cacheMiddle = async function (ctx, next) {
        ctx.cache = {
            get: getCache,
            set: setCache
        };

        global.MyCache = ctx.cache;

        await next();
    };

    return cacheMiddle;
};
