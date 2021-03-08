const crypto = require("crypto");

// * 对称加密解密的使用

function encrypt(data, key, iv) {
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  // 加密数据
  cipher.update(data);
  // 按照十六进制输出加密数据
  return cipher.final("hex");
}

function decrypt(data, key, iv) {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  // 添加十六进制数据
  decipher.update(data, "hex");
  // 按照十六进制输出加密数据
  return decipher.final("utf8");
}

// 如果加密选择的是128,秘钥必须是16位的
const secret = "1234567890123456";
const iv = "1234567890123456";
const data = "helloworld";

const encryptedData = encrypt(data, secret, iv);
console.log("encryptedData:", encryptedData);

const decryptedMsg = decrypt(encryptedData, secret, iv);
console.log("decryptedMsg:", decryptedMsg);
