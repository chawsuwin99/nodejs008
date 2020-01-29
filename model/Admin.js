var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var AdminSchema = new Schema({
  Name:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  Password:{
    type:String,
    required:true
  }
});

AdminSchema.pre('save',function(next){
  this.Password = bcrypt.hashSync(this.Password,bcrypt.genSaltSync(8),null);
  next();
});

AdminSchema.statics.compare = function(cleartext,encrypted){
  return bcrypt.compareSync(cleartext,encrypted);
}
module.exports = mongoose.model('Admins',AdminSchema);
