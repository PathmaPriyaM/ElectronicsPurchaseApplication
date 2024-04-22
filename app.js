const express=require('express');
const bodyparser=require('body-parser');
const routing =require('./Routes/routing');
const logger=require('./Utilities/logger');

const app=express();
app.use(bodyparser.json());
app.use(logger);
app.use('/',routing);

app.listen(3000,()=>{
    console.log("App Running in Port 3000");
})