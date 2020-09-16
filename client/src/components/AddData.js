import React,{useState, useContext } from 'react'
import {dataApi } from '../contexApi/dataContex'

export const AddData = (props) => {
    const { postData } = useContext(dataApi)
    const [formData, setFormData ] = useState({
        name:'',
        message:'',
        created_at:''
    });
    const {name , message , created_at } = formData
    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
         let newData = {
           name,message, created_at
         }
         postData(newData)
        setFormData({
          name:'',
          message:'',
          created_at:''
        })
    }
    return (
        <div>
             <div className="hero">
            <form className="box" onSubmit = {e => onSubmit(e)}>
              <h1>Insert New Data</h1>
              <input type="text" name="name" value = {name}
                  onChange = {e => onChange(e)}
                  required  />
              <input type="text" name="message"  
              value = {message}
              onChange = {e => onChange(e)}
              />
              <input type="text" name="created_at"  value = {created_at}
                 onChange = {e => onChange(e)}
                   required />
              <button className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}
