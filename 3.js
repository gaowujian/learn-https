// !在互联网上没有办法安全的交换密钥?? 有了Diffie Hellmon
// 非对称加密的两个主要方向:
// 1. rsa 大素数分解
// 2. ecc 椭圆曲线

// 实现rsa非对称加密算法
// 加密和解密用的密钥不同，但是有关系，不能通过公钥算出密钥
// 两个质数相乘得到一个结果 正向乘很容易 但是通过一个乘积 很难计算两个数
// *利用的是单向函数

let p = 3,
  q = 11;
let N = p * q;
let fN = (p - 1) * (q - 1); //欧拉函数
let e = 7; //随便挑一个质数
// {e,N}=> {7,33}组成公钥，可以发送给任何人
// 公钥加密私钥解   私钥加密公钥解

for (var d = 1; (e * d) % fN !== 1; d++) {} //欧拉公式，不需要了解
console.log(d);

const publicKey = {
  e,
  N,
};

const privateKey = {
  d,
  N,
};
const data = 5;
const c = Math.pow(data, publicKey.e) % publicKey.N;
console.log("c:", c); //加密后的数据
const original = Math.pow(c, privateKey.d) % privateKey.N;
console.log("original:", original); // 原始数据

// * 为什么安全？？？
// 因为{7,33}作为公钥可以给任何人，但是解密的时候需要 c, d, N,
// c是加密后的数据，N是发送给其他人的公钥，我们还需要d，计算d需要知道fN, 这时候就需要知道p和q
// 但是p和q是不会发送给其他人的，虽然其他人知道了N为33，但是不能反推出来p和q
// 所以有了公钥是不可能推算出私钥的,
// 这也就是为什么即使在网络上有人获取到了你传递的信息，但是他没有私钥是无法解密的
