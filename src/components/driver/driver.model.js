const { Schema, model, Types } = require("mongoose");
const bcrypt =require('bcrypt')
const schema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  email:
  {
    type: String,
    required: [true, "email required"],
    trim: true,
  },
  password:{
    type:String,
    required: [true, "password required"],
    minlength: [6, "minlength 6 characters"],
  },
  phone:{
    type: String,
    required: [true, "phone required"],
    minlength: [11, "too short user phone"],
  },
  image: String,
  ratingAverage:{
    type:Number,
    min:1,
    max:5
  },
  isArrived:{type:Boolean,
    default:false},
  rateCont:{
    type:Number,
    default:0,
  },
  balance:{type:Number,
  default:0} ,
  car:{
    type:Types.ObjectId,
    ref:"car"
  } 
},{
    timestamps:true
});
schema.post('init',(doc)=>{
  doc.image=doc.image
})
schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  next()
})
module.exports = model("driver", schema);
