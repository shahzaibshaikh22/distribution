// const mongoose = require("mongoose");


// const CustomerSchema = mongoose.Schema({
//     username:{
//         type:String,
//     },
//     address:{
//         type:String,
//     },
//     phone:{
//         type:Number,
//     },
//     nten:{
//         type:String,
//     },
//     createdAt:{
//         type:Date,
//         default:new Date()
//     }
// },{timestamps:true})

// const Customer = mongoose.model("Customer", CustomerSchema)
// module.exports = Customer;

const mongoose = require("mongoose");


const CustomerSchema = mongoose.Schema({
    code:{
        type:Number
    },
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    town:{
        type:String,
    },
    zone:{
        type:String,
    },
    salesman:{
        type:String,
    },
    productcompany:{
        type:String,
    },
    customercategory:{
        type:String,
    },
    phone:{
        type:String,
    },
    mobile:{
        type:String,
    },
    email:{
        type:String,
    },
    gst:{
        type:String,
    },
    ntn:{
        type:String,
    },
    designation:{
        type:String,
    },
    contactperson:{
        type:String,
    },
    openingbalance:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Customer = mongoose.model("Customer", CustomerSchema)
module.exports = Customer;