// 数字签名 (也算一种特殊的加密解密, 这种加密的思想和对称/非对称加密的思想不同，不是为了如何计算出原数据，再去比较，而是比较散列后的结果)

// 私钥加密（签名） 公钥解密（验签） 是为了数字签名
// 我用自己的私钥给一个数据签名，发给别人，别人有我的公钥，
// 就可以验证签名，如果成功就说名是我发的，否则被篡改

// 公钥加密（数据加密） 私钥解密（数据解密） 为了做数据加密

const { generateKeyPairSync, createSign, createVerify } = require("crypto");
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
    passphrase: "passphrase", //私钥的密码 ？？ 虽然有了银行卡，但是还需要一个密码
  },
});

const file = "file";
const signObj = createSign("rsa-sha256"); //创建签名文件
signObj.update(file); //传入需要签名的文件
const sign = signObj.sign({ key: rsa.privateKey, format: "pem", passphrase: "passphrase" }, "hex"); //添加签名;
console.log("sign:", sign);

const verifyObj = createVerify("rsa-sha256");
verifyObj.update(file);

// ! verify验证函数的内部实现，自己也拿到了文件，使用别人的publicKey做一次sign，比较拿到的签名，和自己生成的签名是否相同
const isValid = verifyObj.verify(rsa.publicKey, sign, "hex");
console.log("isValid:", isValid);

// 加密传输 （关注的是信息不用明文进行传输）
// 两方通信，我先发送一个没加锁的箱子给你，把公钥也给你，你把敏感信息放进去，然后用钥匙把它锁上。
// 即使有人拿到了这个箱子，但是没有私钥，你也无法打开箱子

// 数字签名 （关注的是数据的信息未被篡改）
// 我先使用自己的私钥加密，写了一封保证信，然后把信给了比人，别人有我的公钥，然后拿信和公钥去做验证，就知道这封信是我本人写的

// !如果文件被改了，签名也被改了。那么黑客可以把这些修改过的信息发送给你,这时候就需要证书的存在。

// 例如身份证，身份证可以得到别人的认可，因为他是由权威机构办法的，如果你想验证他的真伪，需要交给公安局去验证一下。
