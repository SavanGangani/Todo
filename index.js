const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./routes/user');
const authUser = require('./routes/auth');
const myData = require('./routes/data');

dotenv.config();

mongoose
    .connect(process.env.Mongo_URL)
    .then(()=> console.log("DB IS CONNECTION SUCCESSFULL"))
    .catch((e)=> console.log(e));

app.use(express.json());

app.use("/api/users", user);

app.use("/api/auth", authUser);

app.use("/api", myData);


app.listen(process.env.PORT,()=>{
    console.log("SERVER IS RUNNING!");
});