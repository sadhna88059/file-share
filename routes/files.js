const router = require("express").Router();

const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),

  filename: (req, file, cb) => {
    const uniquename = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`

    cb(null, uniquename);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  //validate request

  //store data
  upload(req, res,async (err) => {
    if (!req.file) {
      return res.json({ error: "all fields are required" });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    //store into database
    const file = new File({
      filname: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,

      size: req.file.size
    });

    const response =await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
    });
    //response -> link
  });
});
router.post('/send',async(req,res)=>{
  const{uuid,emailTo,emailFrom}=req.body
  if(!uuid||!emailTo||!emailFrom){
    return res.status(422).send({error:'all fields are required'})
  }

  const file=await File.findOne({uuid:uuid})
  if(file.sender){
    return res.status(422).send({error:'email already sent'})
  }

  file.sender=emailFrom;
  file.receiver=emailTo;
  const response= await file.save()

 const sendMail=require('../services/emailService')
 sendMail({
  from: emailFrom, // sender address
  to: emailTo, // list of receivers
  subject: "Hello ✔", // Subject line
  text:`${ emailFrom} shared file`, // plain text body
  html: require('../services/emailTemplate')({
    emailFrom:emailFrom,
    downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
    size:parseInt(file.size/1000)+'KB',
    expires:'24 hours'
  }) // html body
});
return res.send({success:true})
})


module.exports = router;
