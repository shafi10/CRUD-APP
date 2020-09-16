import React,{ useContext , useEffect , useState} from 'react'
import { dataApi } from '../contexApi/dataContex'
import Spinner from './Spinner'

export const UpdateData = (props) => {
    const { getSingleData, singleData ,editData, loading } = useContext(dataApi)

    const [formData, setFormData ] = useState({
        name:'',
        message:'',
        created_at:'',
    });

    useEffect(() =>{
        getSingleData(props.match.params.id)
    },[])

    const openData =(singleData)=>{
        setFormData({
            name: singleData.name,
            message: singleData.message,
            created_at: singleData.created_at
        })
      }

    const {name , message , created_at } = formData
   const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
   const onSubmit = async e => {
       e.preventDefault();
        let newData = {
          id: props.match.params.id,
          name,message, created_at
        }
        editData(newData)
        props.history.push('/')
   }

    return loading ? <div><Spinner /></div> : (
        <div className="hero">
            <div className="confirm">
              <span>Are you sure to update? </span><button onClick={() => openData(singleData)} className="btn btn-primary" >Confirm</button>
            </div>
            <form className="box" onSubmit = {e => onSubmit(e)}>
              <h1>Update Data</h1>
              <input type="text" name="name" value = {name}
                  onChange = {e => onChange(e)}
                  required  />
              <input type="text" name="message"  
              value = {message}
              onChange = {e => onChange(e)}
              required 
              />
              <input type="text" name="created_at"  value = {created_at}
                 onChange = {e => onChange(e)}
                   required />
              <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
