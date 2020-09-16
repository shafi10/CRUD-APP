import React,{createContext, useReducer} from 'react'
import dataReducer from './dataReducer'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    datas:[],
    singleData:{},
    loading:true,
    message:null,
    alert:[],
    error:{}
}


export const dataApi = createContext(initialState)


export const GlobalData = ({children}) =>{
    const [state, dispatch] = useReducer( dataReducer , initialState)

    function setAlert(msg, alertType, timeout = 3000){
        const id = uuidv4();
     
        dispatch({
            type:'SET_ALERT',
            payload:{ msg , alertType,id}
        })
     
        setTimeout(()=> dispatch({
            type: 'REMOVE_ALERT',
            payload:id
        }), timeout)
     }

    async function getData(){
        try {
            const {data} = await axios.get('/data')
    
            dispatch({
                type:'GET_DATA',
                payload:data.rows
            })
        } catch (error) {
            dispatch({
                type:'DATA_ERROR',
                payload:error
            })
        }
    }

    async function getSingleData(id){
        try {
            const {data} = await axios.get('/data/single/'+id)
            dispatch({
                type:'SINGLE_DATA',
                payload:data
            })
        } catch (error) {
            dispatch({
                type:'DATA_ERROR',
                payload:error
            })
        }
    }
      
    async function editData(newdata){
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const {data} = await axios.post('/data/edit',newdata, config)
            dispatch({
                type:'EDIT_DATA',
                payload:data
            })
            setAlert('Data Updated', 'success')
        } catch (error) {
            dispatch({
                type:'DATA_ERROR',
                payload:error
            })       
        }
     }

     async function postData(newdata){
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const {data} = await axios.post('/data',newdata, config)
            dispatch({
                type:'POST_DATA',
                payload:data
            })
            setAlert('New Data Inserted', 'success')
        } catch (error) {
            dispatch({
                type:'DATA_ERROR',
                payload:error
            })       
        }
     }

     async function deletelData(id){
        try {
            await axios.delete('/data/delete/'+id)
            dispatch({
                type:'DEL_DATA',
                payload:id
            })
            setAlert('Data Deleted', 'danger')
        } catch (error) {
           dispatch({
               type:'STUDENT_ERROR',
               payload:error
           })
        }
    }


    return (
       <dataApi.Provider value={{
        getData,
        datas:state.datas,
        getSingleData,
        singleData: state.singleData,
        editData,
        loading:state.loading,
        postData,  deletelData, setAlert, 
        alerts: state.alert
       }}>
          {children}
       </dataApi.Provider>
    )
}