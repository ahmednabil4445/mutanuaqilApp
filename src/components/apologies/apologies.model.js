const { Schema, model, Types } = require("mongoose");
const bcrypt =require('bcrypt')
const schema = Schema({
 message:String,
 tripId:{ type:Types.ObjectId,
    ref: "trip",
},
driverId:{ type:Types.ObjectId,
    ref: "driver",}
},{
    timestamps:true
});
module.exports = model("apologie", schema);