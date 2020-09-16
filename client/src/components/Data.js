import React,{useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { dataApi } from '../contexApi/dataContex'
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';


export const Data = (props) => {
  const [search, setSearch] = useState('')
  const [searchItem, setSearchItem] = useState([])
    const { getData, datas,  deletelData ,loading} = useContext(dataApi)
         

     useEffect(() =>{
          getData()
     },[])

     const delData =(id) =>{
      deletelData(id)
     }

      useEffect(()=>{
        setSearchItem(
      datas.filter(data =>{
          return data.name.toLowerCase().includes(search.toLowerCase())
      }))
    },[search,datas])
 
    const ascendring =() =>{
      setSearchItem(
        [...datas].sort((a,b) => {
          let com = 0
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            com = 1
          }else if(a.name.toLowerCase() < b.name.toLowerCase()){
            com = -1
          }
          return com
        })
      )
    }

    const descendring =() =>{
      setSearchItem(
        [...datas].sort((a,b) => {
          let com = 0
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            com = -1
          }else if(a.name.toLowerCase() < b.name.toLowerCase()){
            com = 1
          }
          return com
        })
      )
    }

   return loading ? <div><button className="btn btn-primary btn-lg btn-block">Data loading from server</button></div> : (
        <div className="data">
            <div>
               <Link to="/addData" className="btn btn-primary btn-lg btn-block">Add Data</Link>
            </div>

            <div className="heading">
              <h1>Data List</h1>
            </div>
            <div className="search">
              <label> Search: </label>
                 <input type="text" className="loan-sel" placeholder="Search with name" name="search"
                 value = {search}
                 onChange= { (e) => setSearch(e.target.value)} />
             </div>
          
            <table className="table text-center">
            <DragDropContext onDragEnd={(param)=>{
               const srcI = param.source.index
               const desI = param.destination.index
               searchItem.splice(desI, 0, searchItem.splice(srcI,1)[0])
             }}
              
             >
              <thead>
                <tr className="table-primary">
                     <th className="dropdown">
                       <span>Name<i class="fas fa-caret-down"></i></span>
                     <div className="dropdown-content">
                          <button className="btn btn-primary mb-2" onClick={() => ascendring()}>Sort by asc </button>
                          <button className="btn btn-primary" onClick={() => descendring()}>Sort by desc </button>
                          </div>
                     </th>
                     <th scope="col">Message</th>
                     <th scope="col">Created At</th>
                     <th scope="col">Action</th>
                 </tr>
               </thead>
                 <Droppable droppableId="droppable-1">
                 {(provided, _) => (
                 <tbody ref={provided.innerRef} {...provided.droppableProps}>
                   { searchItem && searchItem.map((data, i) =>
                   <Draggable key={data.id} draggableId={"draggableId-"+ data.id} index={i}>
                    {(provided, snapshot) => (
                    <tr key={data.id}  ref={provided.innerRef} {...provided.draggableProps} 
                    style={{
                      ...provided.draggableProps.style,
                      boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none"}}
                    {...provided.dragHandleProps}
                    
                    >
                    <td>{data.name}</td>
                   <td>{data.message}</td>
                   <td>{data.created_at}</td>
                   <td>
                       <Link to={ '/update/'+ data.id } className="btn btn-primary">Update</Link>
                       <button className="btn btn-primary ml-2" onClick={() => delData(data.id)}>Delete</button>
                    </td>
                 </tr>   
                  )}   
                 </Draggable>            
                    )}
                    {provided.placeholder}
                    </tbody>
                    )}
                    </Droppable>
            </DragDropContext>
            </table>

        </div>
    )
}
