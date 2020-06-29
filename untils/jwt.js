const jwt = require('jsonwebtoken');
const fs = require('fs');

const cert = fs.readFileSync(__dirname + "/key/key.pem");
const pub = fs.readFileSync(__dirname + "/key/key.pub");

function sign(obj, callback) {
    jwt.sign(obj, cert, { algorithm: "RS256" }, (err, token) => {
        callback(err, token);
    });
}

function verify(token, callback) {
    jwt.verify(token, pub, (err, decode) => {
        callback(err, decode);
    });
}
module.exports = {
    sign: sign,
    verify: verify
}