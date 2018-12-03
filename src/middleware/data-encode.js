/**
 * Created by wp on 2017-05-11.
 */

var ursa = require('ursa');
var crypto = require('crypto');
var fs = require('fs');
var request = require('request');
let httpClient = request.defaults({jar: true});

function encodeData() {
    // let data = {
    //     "postId": 2,
    //     "postDutyList": [
    //         {
    //             "dutyId": 1
    //         },
    //         {
    //             "dutyId": 2
    //         },
    //         {
    //             "dutyId": 3
    //         }
    //     ]
    // };
    let data = {
        "userId": "27"
    };
    data = JSON.stringify(data);
    // let data = '/getToken';
    let md5 = crypto.createHash('md5');
    console.info(data.substring(0, 11));
    if(data.length > 11){
        md5.update(data.substring(0, 11));
    }else{
        md5.update(data);
    }
    let md5Data = md5.digest('hex');
    console.info(md5Data);
    let publicKey = ursa.createPublicKey(fs.readFileSync('../../public.pem'));   //导入秘钥
    let encode = publicKey.encrypt(md5Data, 'hex', 'base64', 'RSA-OAEP');
    encode = encodeURIComponent(encode);
    console.info(encode);
    data = JSON.parse(data);
    data.signer = encode;
    console.info(data);
    // httpClient({
    //     method: 'GET',
    //     url: 'http://localhost:1501/getUseDuty?userId=27&signer='+ encode,
    //     // body: JSON.stringify(data),
    //     headers: {
    //         'content-type': 'application/json'
    //     }
    // }, function (err, response, body) {
    //     if (err) {
    //
    //     } else {
    //         console.info(body);
    //     }
    // })
}

encodeData();



// function decodeData() {
//     let data = 'PAxolvBbfSk1wlqvJnzFtrfxE8nBKGqxFQSLXXuKrufPolZpDEvIq8bJw6LV8phhmdzjrAiSRC92NE8HPF05EyGKOUPn/BLl6X/NH117h/K4MOwFSAqipLWKP8qQfv8MLaU3l40JdUXyGhKpnutPHAEGJ8oSAGB0Qvws7iPtquw='
//     let privateKey = ursa.createPrivateKey(fs.readFileSync('../../private.pem'));
//     let decodeData = privateKey.decrypt(data, 'base64', 'utf8');
//     console.info(decodeData);
//     // let encodeData = data.substring(32);
//     // let md5String = data.substring(0, 32);
//     // let md5 = crypto.createHash('md5');
//     // md5.update(encodeData);
//     // let md5Hex = md5.digest('hex');
//     // if(md5String === md5Hex){
//     //
//     //     console.info(decodeData);
//     // }
// }
//
// decodeData();





//
// function encodeData() {
//     let data = {
//         userName: 'admin',
//         passWord: 'asd123456'
//     };
//     data = JSON.stringify(data);
//     let publicKey = ursa.createPublicKey(fs.readFileSync('../../public.pem'));   //导入秘钥
//     let md5 = crypto.createHash('md5');
//     md5.update(data);
//     let md5Hex = md5.digest('hex');
//     let encode = publicKey.encrypt(md5Hex, 'utf8', 'base64');
//     console.info(encode.length);
//     console.info(encode+data);
// }
//
// encodeData();


// function decodeData() {
//     let data = 'PWRwRnSi+obLwn2PgKFcuRk59ilLL/9Sri1MvSaJNn/Zr09+pYqyR2RI0izAnkHTbhk9oOauaskckacdzHQ7iZxBQbwhFNVoqRjzeqBcAQ6aznOtXSZZv4xGhMGSDmK/j89GwUJyZBLli5z1BcdV6R2LxdT40botJsx+HwZFOGY='
//     let privateKey = ursa.createPrivateKey(fs.readFileSync('../../private.pem'));
//
// }
