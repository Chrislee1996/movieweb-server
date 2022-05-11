const mongoose= require('mongoose')
const replySchema = require('./reply')
const { Schema, model} = mongoose


const commentSchema = new mongoose.Schema({
    note: {
        type:String,
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'User', 
    },
    reply: [replySchema]
},{
    timestamps: true
})

module.exports = commentSchema