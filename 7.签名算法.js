// 数字签名: 数字签名的基本原理是用私钥去签名，而用公钥去验证签名
// 数字签名解决的数据被被篡改的问题

const { generateKeyPairSync, createSign, createVerify } = require("crypto");
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
    passphrase: "passphrase", //私钥的密码 ？？ 虽然有了银行卡，但是还需要一个密码
  },
});

// !签名的时候需要两样东西: 文件和私钥
const file = "file";
// 创建签名对象
const signObj = createSign("rsa-sha256");
// 添加文件内容
signObj.update(file);
// 用rsa的私钥进行签名，并返回一个16进制字符串
const sign = signObj.sign({ key: rsa.privateKey, format: "pem", passphrase: "passphrase" }, "hex"); //添加签名;
console.log("sign:", sign);

// !验签的时候需要三样东西: 文件,签名和公钥
// 创建一个验签对象
const verifyObj = createVerify("rsa-sha256");
// 添加文件内容
verifyObj.update(file);
// 验证签名是否有效
const isValid = verifyObj.verify(rsa.publicKey, sign, "hex");
console.log("isValid:", isValid);

// 验证方先拿到文件file
// 加密传输 （关注的是信息不用明文进行传输）
// 两方通信，我先发送一个没加锁的箱子给你，把公钥也给你，你把敏感信息放进去，然后用钥匙把它锁上。
// 即使有人拿到了这个箱子，但是没有私钥，你也无法打开箱子

// 数字签名 （关注身份校验，这和登陆注册是一回事，登陆的的时候也是去进行hash然后和数据库中的密码看是否相等）
// 我先使用自己的私钥加密，写了一封保证信，然后把信给了别人，别人有我的公钥，然后拿信和公钥去做验证，就知道这封信是我本人写的
