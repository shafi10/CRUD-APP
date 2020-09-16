const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename), 'data' , 'data.json')

const fetchAllData = (cb)=>{
   fs.readFile(p , (err, fileContent)=>{
     if(err){
       cb([])
     }
     cb(JSON.parse(fileContent))
   })
}

module.exports = class Data{
    constructor(id, name, message, created_at){
        this.id= id;
        this.name= name;
        this.message = message;
        this.created_at = created_at;
    }

    save() {
         fetchAllData(data=>{
          data.push(this);
          fs.writeFile(p, JSON.stringify(data), err => {
            console.log(err);
          });
        });
      }

      EditSave(){
        fetchAllData(data=>{
          if(this.id){
          const existing  = data.findIndex(p=>p.id===this.id);
          const updatedata = [...data];
          updatedata[existing]=this;
         fs.writeFile(p , JSON.stringify(updatedata), err=>{
            console.log(err)
          })
        }
        else{
          console.log('not found')
        }
        })
      }

      static fetchAll(cb){
        fetchAllData(cb)
      }

      static findById(id , cb){
        fetchAllData(data=>{
          const newdata = data.find(p=>p.id===id)
          cb(newdata)
        })
      }

      static deleteById(id){
        fetchAllData(data=>{
             const  updatedata = data.filter(p=> p.id != id)
             fs.writeFile(p, JSON.stringify(updatedata), err=>{
               console.log(err);
             })
           })
      }
}