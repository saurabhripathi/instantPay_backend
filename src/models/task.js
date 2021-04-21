const mongoose = require('mongoose');
const collections = require('../configuration/collection.config');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// creating Task Schema //
const taskDetail = new Schema({
    name:
    {
        type: String,
    },
    taskId: {
        type: Number,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true
});


taskDetail.plugin(AutoIncrement, { inc_field: 'taskId' });
const task = mongoose.model(collections.task, taskDetail);

module.exports = task;