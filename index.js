var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const mySecret = process.env['MONGO_DB'];
mongoose.connect(mySecret);

const fileSchema = new mongoose.Schema({
  name: {
    type:String,
    require:true
  },
  type: String,
  size: String
})
const File = mongoose.model('File',fileSchema)


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.post('/api/fileanalyse',upload.single('upfile'), async (req,res)=>{
  let newFile = new File({
    name:req.file.originalname,
    type:req.file.mimetype,
    size: req.file.size
  });
  let result = await newFile.save();
  res.json(result);
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
