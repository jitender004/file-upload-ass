const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + Math.random().toString();
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png"){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

//This is an middleware
const uploadSingle = (fileKey) => {
  return (req, res, next) => {
    const uploadItem = upload.single(fileKey);
    uploadItem(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).send({ message: er.message });
      } else if (err) {
        return res.status(500).send({ message: er.message });
      }
      // if file upload done then next function will called
      next();
    });
  };
};

//This is an middleware
const uploadMultiple = (fileKey) => {
  return (req, res, next) => {
    const uploadItem = upload.any(fileKey);
    uploadItem(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).send({ message: er.message });
      } else if (err) {
        return res.status(500).send({ message: er.message });
      }
      next();
    });
  };
};



// function to for patch request to change the name of file

// Main function to remove files from server itself
const directory = path.join(__dirname, "../uploads");
const file = "16449542521300.4005098821948321-Screenshot (12).png";
//   const removeFile = (file)=>{
//     fs.readdir(directory, (err, files) => {
//       if (err) throw err;
//       files.forEach((elem)=>{
//         if(elem==file){
//           fs.unlink(path.join(directory,file), err=>{
//             if(err) throw err;
//           })
//         }
//       })
//     });
//   }

//updated remove function to remove files from directory
// const removeFile = (file, directory) => {
//   fs.readdir(directory, (err, files) => {
//     if (err) throw err;
//     files.forEach((elem) => {
//       if (elem == file) {
//         fs.unlink(path.join(directory, file), (err) => { if (err) throw err; });
//         // console.log(elem==file)
//       }
//     });
//   });
// };
// removeFile(file, directory);

// main function to remove files from local server
const removeFile = (file)=>{  
  fs.readdir(directory, (err, files) => {
    if(err) throw err;
    files.map((i)=>{
      let filepath = path.join(directory, i);
      if(filepath==file){
        fs.unlink(file, (err)=>{
          if(err) throw err;
        })
      }
    })    
  });  
}

// removeFile(file, directory);

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = { upload, uploadSingle, uploadMultiple, removeFile};
