const express = require('express')
const app = express()
const supabase = require('./connection')
const path = require('path')
const bodyParser = require('body-parser')
//To access and use the images and access URL body
app.use( express.static( "public" ) );
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({extended:true}));

//Setting the view engine as EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Component List
app.get('/comp', async(req,res)=>{
    const { data, error } = await supabase
  .from('components_list')
  .select(`*`)
  res.render('students/cmplist',{components:data})
})

//Lab List
app.get('/lablist', async(req,res)=>{
    const { data, error } = await supabase
  .from('lab')
  .select(`*,teacher_profile(name)`)

  res.render('students/lablist',{info: data})
})


//Create Request
app.get('/createreq', async(req,res)=>{
  const { data, error } = await supabase
.from('components_list')
.select(`*, lab(lab_name)`).eq('status','available')

res.render('students/create_request',{info: data})
})

app.post('/request',async(req, res)=>{
  var laboratory = req.body.lab.toLowerCase();
  var component= req.body.component.toLowerCase();
  var reasons  = req.body.reason;

  const { data, error } = await supabase
.from('components_list')
.select(`cid,lid, lab(tid)`).eq('name',component)

const { error2 } = await supabase
  .from('student_request')
  .insert({ sid: 2, 
    request: component, 
    reason: reasons, 
    tid: data[0].lab.tid,
    lid:data[0].lid, 
    cid:data[0].cid})

res.redirect('/')

})

//Student Home
app.get('/', async(req,res)=>{
  const { data, count } = await supabase
.from('student_request')
.select(`*`,{count:'exact'})
console.log(data);

res.render('students/home',{requests: data, reqcount:count})
})


//Teacher Home
app.get('/teacher', async(req, res)=>{
  const { data, count } = await supabase
.from('student_request')
.select(`*, student_profile(name, email), lab(lab_name)`,{count: 'exact'})
// console.log(data);

res.render('teacher/home',{requests: data, reqcount:count})
})

//Request Detail on Teacher Side
app.get('/treqdetail', async(req, res)=>{
  const { data, count } = await supabase
.from('student_request')
.select(`*`,{count: 'exact'}, )

res.render('teacher/reqdetail',{requests: data, reqcount:count})
})

//Approving Or Rejecting Request
app.post('/approve',async(req,res)=>{
  let rqid = parseInt(req.body.approve)
  const {error} = await supabase
  .from(`student_request`)
  .update({status: 'approved'})
  .eq('rid',rqid);
  
  res.redirect('/teacher');
})
app.post('/reject',async(req,res)=>{
  let rqid = parseInt(req.body.reject)
  const {error} = await supabase
  .from(`student_request`)
  .update({status: 'rejected'})
  .eq('rid',rqid);

  res.redirect('/teacher');
})



app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})


