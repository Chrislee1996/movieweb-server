const mongoose= require('mongoose')
const { Schema, model} = mongoose


const replySchema = new mongoose.Schema({
    note: {
        type:String,
        required:true
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'User', 
    },
},{
    timestamps: true
})

module.exports = replySchema