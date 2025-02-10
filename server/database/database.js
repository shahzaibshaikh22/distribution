// const mongoose = require("mongoose")

// export const connect = ()=>{
//     const uri = process.env.MONGODB_URI;
//     const db =  mongoose.connect(uri,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then(()=> console.log("database connected"))
//     .catch((error) =>{
//         console.log(error.message);
        
//     })
//     return db
// }
// const mongoose = require('mongoose')

// const connect = ()=>{
//     mongoose.set("strictQuery",true)
//     const db =  mongoose.connect('mongodb://127.0.0.1:27017/distribution');
//     console.log("database connected");
//     return db
// }

// module.exports = connect

const mongoose = require('mongoose')

 const connect = ()=>{
    const uri = process.env.MONGODB_URI_LOCAL;
    const db =  mongoose.connect(uri)
    .then(()=> console.log("database connected"))
    .catch((error) =>{
        console.log(error.message);
        
    })
    return db
}
module.exports = connect
