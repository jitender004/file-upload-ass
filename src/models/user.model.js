const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id  : {type : Number, unique : true  },
  first_name : {type : String, required : true  },
  last_name : {type : String, required : true  },
  email : {type : String, required : true  },
  pincode : {type : Number },
  age : {type : Number  },
  gender : {type : String , default : "Male"},
  profile_pic : [{type : String}]

},{
  versionKey : false
}
);

module.exports = mongoose.model("user", userSchema);