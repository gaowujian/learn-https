// 哈希
// 主要用法有两种
// 1. 完整性校验 md5
// 2. 加密 SHA256( Secure Hash Algorithm)

// 哈希函数
// 1. 不同输入有不同输出
// 2. 不能根据输出反推输入
// 3. 长度固定

function hash(num) {
  // 固定4位，不足补0
  return (num % 1024).toString().padStart(4, 0);
}

//不同输入有不同输出，可能会碰撞
console.log(hash(1));
console.log(hash(2));
//不能反推是1还是1025
console.log(hash(1025));
