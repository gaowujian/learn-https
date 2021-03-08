// Diffie-Hellman算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来

const N = 23;
const p = 5;

const secretA = 6;
const valA = Math.pow(p, secretA) % N; //(5**6)%N
console.log("valA:", valA);

const secretB = 15;
const valB = Math.pow(p, secretB) % N; //(5**15)%N
console.log("valB:", valB);

// ===============
// 开始协商的过程
// 此时 A 有了 N p valA和secretA四个值, 并可以获得valB, 计算协商密钥
console.log(Math.pow(valB, secretA) % N); // (((5**15)%23)**6)%23

// 此时 B 有了 N p valB和secretB四个值, 并可以获得valA, 计算协商密钥
console.log(Math.pow(valA, secretB) % N); //(((5**6)%23)**15)%23
