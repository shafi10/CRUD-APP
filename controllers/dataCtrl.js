const Data = require('../models/dataModel') 


exports.postaddData= (req,res,next) =>{
    let id = (Math.random() * 10).toString()
    try {
        const data = new Data(id,req.body.name, req.body.message, req.body.created_at)
        data.save();
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

exports.getData = (req,res,next)=>{
  Data.fetchAll(data=>{
    res.json({ message:'Data List' , rows: data})
  })
}

exports.getsingleData = (req,res,next)=>{
    try {
        const id= req.params.id;

    Data.findById(id , data=>{
        res.json(data)
    })
    } catch (error) {
        console.log(error)
    }
}

exports.postEdit = (req,res,next)=>{
  const id = req.body.id;
  const name = req.body.name;
  const message = req.body.message;
  const created_at = req.body.created_at
  const data = new Data(
    id,
    name,
    message,
    created_at
  );

  data.EditSave();
  
  res.json(data)
}

exports.deleteProduct = (req,res,next)=>{
    try {
        const id = req.params.id;
        Data.deleteById(id)

        res.json({ msg: 'Data Deleted' })
    } catch (error) {
        console.log(error)
    }
}