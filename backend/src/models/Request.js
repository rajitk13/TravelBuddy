const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    _id:{
        type:  mongoose.Schema.Types.ObjectId
    },
    from:{
        type:String,
        required:true
    }, 
    to:{
        type:String,
        required:true
    },
    when:{
        type:Date,//new Date(year, monthIndex, day, hours, minutes, seconds)
        required:true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    interested:{
        type:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }]
    },
    requiredStrength:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

const Request = new mongoose.model('Request',requestSchema);
module.exports=Request;