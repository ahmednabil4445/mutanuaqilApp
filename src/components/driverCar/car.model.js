const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    carName:String,
    carNumber:String,
    carImage:String,

  },
  { timestamps: true }
);
schema.post('init',(doc)=>{
  doc.image=doc.image
})

module.exports = model("car", schema);
