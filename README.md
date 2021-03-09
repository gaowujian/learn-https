```
信息窃听	信息加密	对称加密 AES
密钥传递	密钥协商	非对称加密(RSA和ECC)
信息篡改	完整性校验	散列算法(MD5和SHA)
身份冒充	CA权威机构	散列算法(MD5和SHA)+RSA签名
```

TLS 握手包中的密码套件都是 TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
密码套件从功能上一般就三部分：密钥交换、加密、hash。
所以从名称中可以看出：ECDHE_RSA 是用于密码交换，AES_128_GCM 是加密（带有 MAC 功能），SHA256 是 hash 算法。
