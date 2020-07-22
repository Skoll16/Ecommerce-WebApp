const express=require('express');
const bodyparser=require('body-parser')
const PORT=3000;
const cors=require('cors')
const api=require('./Routes/api')
const app=express()
app.use(cors())
app.use("/images",express.static("images"))

app.use(bodyparser.json())
app.use('/skoll',api);

app.get('/',(req,res)=>{
  res.status(200).send('hi')
})
app.listen(PORT,function(){
  console.log('Hosted')
})
