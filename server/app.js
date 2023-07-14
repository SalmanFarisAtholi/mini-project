const cors = require('cors') ;
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt')

const express  = require('express');
const logger = require('morgan');
const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')
const connectDb = require('./model/dbconnection')
const adminDB = require('./model/adminSchema')

const app = express();
app.use(bodyParser.json({limit: '300kb'}));
connectDb(DATABASE_URL)
app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true,
}))

app.use(logger("dev"))
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static("public"))
app.use(cookieParser())

// const addadmin =  async() => {
 
// let password = "123456"
// let salt = await bcrypt.genSalt(10)
// let pass = await bcrypt.hash(password, salt)
// let email = "admin@gmail.com"
//  await adminDB.insertMany({
//     email:email,
//     password:pass,
//   })

// }
// addadmin()


app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});

module.exports = app;