var express = require('express');
var usersctrl = require('../services/index');
var multer = require('multer');
var name=""
// Routes
const filename = "";
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/Images');
    },
    filename: function (req, file, callback) {
       // You can write your own logic to define the filename here (before passing it into the callback), e.g:
      
      var avt =file.mimetype
      const filename = `file_${file.originalname}`; // Create custom filename (crypto.randomUUID available in Node 19.0.0+ only)
      const baseUrl = `${req.protocol}://${req.headers.host}`+"/Images/"+filename;
    
      name=baseUrl, 
      callback(null, filename);
    }
  })
  const multerFilter = (req, file, cb) => {
    const format = file.mimetype.split("/")[1];
    if (format === "jpg" || format === "jpeg" || format === "png" ) {
      cb(null, true);
    } else {
      cb(new Error("Not a image authorize File!!"), false);
    }
  };
 const upload = multer({ 
    storage: storage,
    limits: {
       fileSize: 5248576 // Defined in bytes (5 Mb)
    }, 
    fileFilter: multerFilter,
 })
 
    exports.router=(function(){
        var apiRouter= express.Router();
        apiRouter.route('/home').get(usersctrl.findAll);
        apiRouter.route('/create').post(usersctrl.create);
        apiRouter.route('/update').patch(usersctrl.update);
        apiRouter.route('/delete').post(usersctrl.delete);
        apiRouter.route('/find').post(usersctrl.findById);
        apiRouter.route('/delete').post(usersctrl.deleteById);
        apiRouter.route('/upload').post(upload.any(), (req, res)=>{
            
            var id =req.body.id
            console.log(req.files)
            console.log(id)
            var models = require('../../models');
            models.User.findOne({ where : {id : id}})
            .then(function(UserFound){
                models.User.update({
                    image : name? name : 'public'
                },
                { where :{ id : UserFound.id}}
                )
                return res.status(201).json({
                    'message': 'mise a jour mise avec success'
                })
            })
        })
    return apiRouter;

})();