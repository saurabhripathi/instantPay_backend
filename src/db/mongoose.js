const mongoose=require('mongoose');
// creating the connection //
mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_db_url,{useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex: true,autoIndex: true, useFindAndModify: false});
mongoose.connection
    .once('open', () => console.log('connected to DB'))
    .on('error', (error) => console.log(error));