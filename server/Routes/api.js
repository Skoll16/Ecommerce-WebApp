const exrpress = require("express");
const router = exrpress.Router();
const path=require('path')
const mongoose = require("mongoose");
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const multer=require('multer')
// const upload=multer({dest:'images/'})
const app=exrpress()
mongoose
  .connect(
   "ypur db url and pass"
    )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("connection aborted");
  });
const User = require("../Models/eUsers");
const Admin = require("../Models/eAdmins");
const UserProduct=require('../Models/userProducts')
const AdminProduct=require('../Models/adminProducts');
const Cart=require('../Models/cart')
router.get("/", (req, res) => {
  res.status(200).send("route");
});
const MIMI_TYPE={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
}
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid=MIMI_TYPE[file.mimetype];
    const err=new Error("Invalid Extention")
    // if(isValid){err=null}
 cb(null,"images/");
  },
  filename:(req,file,cb)=>{
    const name=file.originalname.toLowerCase().split(' ').join('-');
    const ext=MIMI_TYPE[file.mimetype];
    cb(null,name +'-' +Date.now() +'.' +ext)
  }
})


function verifyToken(req,res,next){
  if(!req.headers.authorization){
    res.status(401).send('Unauthorized Req')
  }
  let token =req.headers.authorization.split(' ')[1];
  if(token==='null'){
    res.status(401).send('Unauthorized Req')
  }
  let payload=jwt.verify(token,'secretKey')
  if(!payload){
    res.status(401).send('Unauthorized Req')
  }

  res.userId=payload.subject
  next()
}
router.post("/userRegistration", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, registerUser) => {
    if (err) {
      console.log(err);
    } else {
      let payload={subject:registerUser._id}
      let token=jwt.sign(payload,'secretKey')

      console.log("User Registration Done!!");
      res.status(200).send({token});
    }
  });
});

router.post("/adminRegistration", (req, res) => {
  let adminData = req.body;
  let admin = new Admin(adminData);
  admin.save((err, registerAdmin) => {
    if (err) {
      console.log(err);
    } else {
      let payload={subject:registerAdmin._id}
      let token=jwt.sign(payload,'secretKey')
      console.log("Admin Registration Done!!");
      res.status(200).send({token});
    }
  });
});
router.post("/userLogin", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("invalid password");
        } else {
          let payload={subject:user._id}
      let token=jwt.sign(payload,'secretKey')
          console.log("User Logged In");
          res.status(200).send({token});
        }
      }
    }
  });
});
router.post("/adminLogin", (req, res) => {
  let adminData = req.body;
  User.findOne({ email: adminData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("invalid password");
        } else {
          let payload={subject:user._id}
      let token=jwt.sign(payload,'secretKey')
          console.log("Admin Logged In");
          res.status(200).send({token});
        }
      }
    }
  });
});

router.post("/userProduct",verifyToken, (req, res) => {
  let userData = req.body;
  let user = new UserProduct(userData);
  user.save((err, checkedProduct) => {
    if (err) {
      console.log(err);
    } else {
      console.log("User Product Done!!");
      res.status(200).send(checkedProduct);
    }
  });
});

router.post("/adminProduct", multer({storage:storage}).single('pimg'),(req, res) => {
  console.log(req.file)

  const url=req.protocol + '://' +req.get("host")
  let admin = new AdminProduct({
    adminID:req.body.adminID,
    pcategory:req.body.pcategory,
    ptitle:req.body.ptitle,
    poffer:req.body.poffer,
    pdescription:req.body.pdescription,
    pdate:req.body.pdate,
    pcompany:req.body.pcompany,
    pimg:url + "/images/" +req.file.filename

  });
  admin.save((err, checkedProduct) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Admin Product Done!!");
      res.status(200).send(checkedProduct);
    }
  });
});

router.post('/cartItems',(req,res)=>{
let cartData=req.body
let cart=new Cart(cartData);
cart.save((err,cartAdded)=>{
  if(err){console.log(err)}
  else{
    console.log("cart added")
    res.status(200).send(cartAdded)
  }
})
})
router.get('/getAdminsProducts',(req,res)=>{
  AdminProduct.find().then(data=>{
    res.status(200).json({
      message:"data send",
      product:data
    });
  })
    })

    router.get('/getAdminProduct',(req,res)=>{
      AdminProduct.find().then(data=>{
        res.status(200).json({
          message:"data send",
          product:data
        });
      })
        })

    router.get('/getCart',(req,res)=>{
      Cart.find().then(data=>{
        res.status(200).json({
          message:"data send",
          cart:data
        });
      })
        })
    router.post('/getUser',(req,res)=>{
      let user=req.body
      User.find({email:user.email}).then(data=>{
        res.status(200).json({
          message:"data send",
          user:data
        });
      })
        })

        router.post('/getAdmin',(req,res)=>{
          let admin=req.body
          Admin.find({email:admin.email}).then(data=>{
            res.status(200).json({
              message:"data send",
              admin:data
            });
          })
            })


        router.post('/sendRegistrationMail',(req,res)=>{
          let user=req.body
          sendRegisterMail(user,info=>{
            // console.log('mail has been send to id to'+ info.messageId)
            res.send(info)
          })
            })

            async function sendRegisterMail(user, callback) {
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "Your mail id",
                  pass: "pass"
                }
              });

              let mailOptions = {
                from: '"SkollSite"', // sender address
                to: user.email, // list of receivers
                subject: "Welcome to SkollSkite", // Subject line
                html: `<h1>Hi ${user.fname}</h1><br>
                <h4>Thanks for joining us...Happy Shopping</h4>`
              };

              // send mail with defined transport object
              let info = await transporter.sendMail(mailOptions);

              callback(info);
            }

            // orderMail

            router.post('/sendOrderMail',(req,res)=>{
              let user=req.body
              sendMail(user,info=>{
                // console.log('mail has been send to id to'+ info.messageId)
                res.send(info)
              })
                })

                async function sendMail(user, callback) {
                  // create reusable transporter object using the default SMTP transport
                  let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: "your mail",
                      pass: "pass"
                    }
                  });

                  let mailOptions = {
                    from: '"SkollSite"', // sender address
                    to: user.email, // list of receivers
                    subject: "Order Confirm", // Subject line
                    html: `<h1>Hi ${user.name}</h1><br>
                    <h4>Thanks for the  purchasing ${user.ptitle}</h4><br>
                    <p>It will be deliver soon</p>`
                  };

                  // send mail with defined transport object
                  let info = await transporter.sendMail(mailOptions);

                  callback(info);
                }

module.exports = router;
