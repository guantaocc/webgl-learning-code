const express = require("express");

const app = express();

const compression = require("compression");

app.use(compression());

// 设置跨域头
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 代理静态文件
app.use(express.static(__dirname));

const port = 3000;

let server = app.listen(port, () => {
  console.log("listen at http://127.0.0.1:%s", port);
});

server.on("close", () => {
  console.log("closed");
});