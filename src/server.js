const http = require("http");
const app = require("./app");

server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});