const { generateKeyPairSync, privateEncrypt, publicDecrypt } = require("crypto");
// * 非对称加密 rsa的使用

// 生成密钥对
const rsa = generateKeyPairSync("rsa", {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: "spki",
    format: "pem", // base64格式的私钥
  },
  privateEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "acs-256-cbc",
    passphrase: "passphrase",
  },
});

let msg = "hello";
// 私钥加密
const encryptedMsg = privateEncrypt(
  {
    key: rsa.privateKey,
    passphrase: "passphrase",
  },
  Buffer.from(msg, "utf-8")
);
console.log("encryptedMsg:", encryptedMsg);

// 公钥解密
const originalMsg = publicDecrypt(rsa.publicKey, encryptedMsg);
console.log("originalMsg:", originalMsg.toString());

// *数据传递的过程
// 我先获取到对方的公钥，对方使用私钥加密数据后发送给我，我用公钥解密获得信息；
// 往回传递信息的时候，我使用对方的公钥加密信息，发送给对方，对方使用自己的私钥解密获得信息

// !人人都有公钥，所以我们不能把机密数据使用私钥加密后进行传输
// !敏感数据需要使用对方的公钥进行加密，交给对方使用私钥解密

// 私钥加密（签名） 公钥解密（验签） 是为了数字签名
// 公钥加密（数据加密） 私钥解密（数据解密） 为了做数据加密
