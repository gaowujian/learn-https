// 使用哈希的md5和sha
const crypto = require("crypto");
const data = "123456";

const md5Hash = crypto.createHash("md5").update(data).update(data).digest("hex");
console.log("md5Hash:", md5Hash);

const salt = "secret";
const sha1Hash = crypto.createHmac("sha256", salt).update(data).update(data).digest("hex");
console.log("sha1Hash:", sha1Hash);
