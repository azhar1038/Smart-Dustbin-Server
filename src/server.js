const http = require("http");
const app = require("./app");

server = http.createServer(app);

server.listen(3000, ()=>{
    console.log("Server started at http://localhost:3000");
});




















// const firebase = require("firebase");

// const port = 3000;
// var firebaseConfig = {
//     apiKey: "AIzaSyBxB0-vme5VsZxe0K-VlCOoxtN3hsTpbG0",
//     authDomain: "test-864ca.firebaseapp.com",
//     projectId: "test-864ca",
//     storageBucket: "test-864ca.appspot.com",
//     messagingSenderId: "637039823120",
//     appId: "1:637039823120:web:bd54d2faa562727dec7d95",
//     measurementId: "G-0PK0NQJ2P0"
// };

// firebase.initializeApp(firebaseConfig);
// let database = firebase.database();
// const app = express();

// app.get('/', (req, res)=>{
//     res.send("Hello World");
// });

// app.get('/write', (req, res)=>{
//     database.ref("test").set({"hello": "test"}, err=>{
//         if(err){
//             console.error("Error: ", err);
//         }else{
//             console.log("Success");
//         }
//     });
//     res.send("writing...")
// });

// app.listen(port, ()=>{
//     console.log(`App running at http://localhost:${port}`);
// });