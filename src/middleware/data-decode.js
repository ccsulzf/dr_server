/**
 * Created by wp on 2017-05-10.
 */

import ursa from "ursa";
import fs from "fs";
import crypto from "crypto";
import _ from "lodash";

module.exports = callback => async(ctx, next) => {
    let signer = null;
    let receiveData = null;
    let url = ctx.url.split("?")[0];
    try{
        if(ctx.method == 'GET' || ctx.method == 'DELETE'){
            signer = decodeURIComponent(ctx.query.signer);
            receiveData = ctx.query;
        }else if(ctx.method == 'POST' || ctx.method == 'PUT'){
            signer = decodeURIComponent(ctx.request.body.signer);
            receiveData = ctx.request.body;
        }
        let privateKey = ursa.createPrivateKey(fs.readFileSync('./private.pem'));
        let result = privateKey.decrypt(signer, 'base64', 'utf8', ursa.RSA_PKCS1_PADDING);

        let md5 = crypto.createHash('md5');
        receiveData = JSON.stringify(_.omit(receiveData, ['signer']));

        if(receiveData){
            if(receiveData.length > 11){
                md5.update(receiveData.substring(0, 11));
            }else{
                md5.update(receiveData);
            }
        }else{
            if(url.length > 11){
                md5.update(url.substring(0, 11));
            }else{
                md5.update(url);
            }
        }
        let md5Hex = md5.digest('hex');
        console.info(md5Hex);
        if(md5Hex === result){
            await next();
        }
    }catch (err){
        console.info(err);
        if (callback) {
            callback(err, ctx);
        }
    }
};
