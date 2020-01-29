var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  Title:{
    type:String,
    required:true
  },
  Content:{
    type:String,
    required:true
  },
  Author:{
    type:Schema.Types.ObjectId,
    ref:'Users',
    required:true
  }
});

module.exports = mongoose.model('Posts',PostSchema);
