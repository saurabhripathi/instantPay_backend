const express= require ('express');
const user =require('./src/Routes/user')
const task =require('./src/Routes/task')
const cors = require('cors');
const bodyParser = require('body-parser');


require('./src/db/mongoose');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',user, task);

module.exports=app

