const { generateKeyPairSync, createHash, createSign, createVerify, publicEncrypt, privateDecrypt } = require("crypto");
// * 模拟CA的原理

// 生成密钥对
const serverRSA = generateKeyPairSync("rsa", {
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

const caRSA = generateKeyPairSync("rsa", {
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

// 要传递的信件内容,
const info = {
  domain: "http://localhost:8080",
  publicKey: serverRSA.publicKey,
};

// 把申请信息发送给CA请求颁发证书
// 实现签名的并不是info，而是info的哈希值
const infoHash = createHash("sha256").update(JSON.stringify(info)).digest("hex");
const passphrase = "passphrase";

function getSign(content, privateKey, passphrase) {
  const signObj = createSign("rsa-sha256");
  signObj.update(content);
  return signObj.sign({
    key: privateKey,
    format: "pem",
    passphrase,
  });
}

// ! 需要是用CA的私钥去对服务器的信息进行签名
const sign = getSign(infoHash, caRSA.privateKey, passphrase);

// 数字证书: 两部分内容
const cert = {
  sign, // CA给server颁发的签名
  info, // server提供给CA的信息，domain和公钥, 如果签名正确就可以使用这些信息了
};

// 1.使用ca的公钥验证，成功之后拿到服务器的公钥

function verifySign(content, sign, publicKey) {
  const verifyObj = createVerify("rsa-sha256");
  verifyObj.update(content);
  //verifyObj肯定已经拿到了content的数据，在内部使用public做一次签名，然后和sign对比
  return verifyObj.verify(publicKey, sign, "hex");
}

try {
  const isValid = verifySign(infoHash, sign, caRSA.publicKey);
  console.log("浏览器验证CA的签名", isValid);

  if (isValid) {
    console.log("这个服务器是真实有效的\r\n");
    // 如果想要给服务器发送数据，那么就可以用这个public key进行数据加密并发送了

    console.log("解密后的信息:", cert.info);
  }
} catch (error) {
  console.log("验证失败", error);
}

// 一个证书里包含了   张三的姓名，张三的公钥，以及CA的签名
// 浏览器和操作系统内置了 CA的公钥，
// 如果李四验证一个证书是否有效，content就是这个证书，sign就是证书内CA的签名,publicKey就是内置的CA publicKey

// 有两个签名
// CA的签名用来证明 张三的公钥是abc
// 信的签名用来证明 信是由张三写的

// 通过tcp协议把李四会把自己的证书发送给张三，如果张三验证通过之后，就可以安全使用证书内的公钥加密数据发送给李四

// 签名需要 文件和私钥
// 验证需要 文件，公钥和签名
