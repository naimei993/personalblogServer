const express = require("express");
const app = express();
const Users = require("./routers/Users");

app.get("/",(req,res) => {
    res.send("hello express")
})
//  配置post解析
app.disable('x-powered-by')
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.static(__dirname+'/public'))
app.use("/api/v1",Users)

app.listen(5000,() => {
    console.log("Server is running on port 5000...")
})