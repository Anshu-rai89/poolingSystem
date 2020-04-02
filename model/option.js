const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
   id:
   {
       type:Number,
       required:true
   },

   question:
   {
         type:mongoose.Schema.Types.ObjectId,
         required:true
   },
   text:
   {
       type:String,
       required:true
   },

   votes:
   {
       type:Number,
   },
   link:
   {
       type:String
   }
},{
    timestamps: true
});







const   Options = mongoose.model('Option', optionSchema);
module.exports = Options;