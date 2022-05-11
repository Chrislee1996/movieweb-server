const mongoose= require('mongoose')
const { Schema, model} = mongoose


const replySchema = new mongoose.Schema({
    note: {
        type:String,
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'User', 
    },
},{
    timestamps: true
})

module.exports = replySchema