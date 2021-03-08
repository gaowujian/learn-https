const crypto = require("crypto");

// const N = 23;
// const p = 5;

// const secretA = 6;
// const valA = Math.pow(p, secretA) % N;
// console.log("valA:", valA);

// 客户端
const client = crypto.createDiffieHellman(512);
const clientKeys = client.generateKeys(); //valA

const prime = client.getPrime(); //p
const generator = client.getGenerator(); //N

// 服务器端

const server = crypto.createDiffieHellman(prime, generator);
const serverKeys = server.generateKeys(); //valB

// 计算协商密钥
const clientSecret = client.computeSecret(serverKeys); //Math.pow(valB, secretA) % N
const serverSecret = server.computeSecret(clientKeys); //Math.pow(valA, secretB) % N

console.log(clientSecret.toString("hex"));
console.log("协商密钥是否相同:", clientSecret.toString("hex") === serverSecret.toString("hex"));
