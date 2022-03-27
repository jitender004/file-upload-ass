const express = require("express");
const User = require("../models/user.model");
const {
  upload,
  uploadSingle,
  uploadMultiple,
  removeFile
} = require("../middlewares/file-upload");
const crudController = require("./crudController");
const router = express.Router();

router.post("/single", uploadSingle("profile_pic"), crudController(User).postSingle);
router.post("/multiple", uploadMultiple("profile_pic"), crudController(User).postMultiple);

router.get("", crudController(User).getAll);
router.delete("/:id",async(req, res)=>{
  try{
    const file = await User.findById(req.params.id).lean().exec();
    file.profile_pic.map((file)=>{
      removeFile(file);    
    })
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.send({User_Deleted : user});
  }catch(err){
    return res.status(500).send({message : err.message});
  }
})

router.patch(("/:id"),uploadMultiple("profile_pic"), async(req, res)=>{
  try{    
    const file = await User.findById(req.params.id).lean().exec();
    file.profile_pic.map((elem)=>{
      removeFile(elem);
      console.log(elem)
    })
    const filePath = req.files.map((elem)=>elem.path)
    const user = await User.findByIdAndUpdate(req.params.id,{
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      pincode: req.body.pincode,
      age: req.body.age,
      gender: req.body.gender,
      profile_pic: filePath,
    },{new:true}).lean().exec();
    return res.send({Updated_user:user});
  }catch(err){
    return res.status(500).send({error : err.message});
  }
})
module.exports = router;
// console.log({
//   id: req.body.id,
//   first_name: req.body.first_name,
//   last_name: req.body.last_name,
//   email: req.body.email,
//   pincode: req.body.pincode,
//   age: req.body.age,
//   gender: req.body.gender,
//   profile_pic: filePath
// })