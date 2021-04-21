const mongoose = require('mongoose');
const collections = require('../configuration/collection.config');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const Task = require('../models/task')

// creating user schema //
const userDetail = new Schema({
    name:
    {
        type: String,
        unique: true
    },
    userId: {
        type: Number,
        unique: true,
    },
    tasksList: {
        type: Array
    }
}, {
    timestamps: true
});

// creating virtual relationship between User and Task //
userDetail.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

userDetail.pre('deleteOne', async function(next){
    console.log("asdf")
    const user = this;
    console.log(user.schema)
    await Task.deleteMany({owner: user.userId})
    next()
})

userDetail.plugin(AutoIncrement, { inc_field: 'userId' });
const user = mongoose.model(collections.user, userDetail);

module.exports = user;