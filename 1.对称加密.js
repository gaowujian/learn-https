// 简单实现对称加密
// ! 对称加密指的是 对信息加密解密使用同一密钥的方式

const secret = 3;
const msg = "abc";

function encrypt(msg) {
  let buffer = Buffer.from(msg);
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = buffer[i] + secret;
  }
  return buffer.toString();
}

function decrypt(msg) {
  let buffer = Buffer.from(msg);
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = buffer[i] - secret;
  }
  return buffer.toString();
}

const encryptedMsg = encrypt(msg);
console.log("encryptedMsg:", encryptedMsg);

const decryptedMsg = decrypt(encryptedMsg);
console.log("decryptedMsg:", decryptedMsg);
