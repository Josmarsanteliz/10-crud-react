import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage()); //empezon con []
  const [isEditing, setIsEditing] = useState(false);
  const [editID, seteditID] = useState(null);
  const [alert, setAlert] = useState({show:false,msg:'',type:''})//object because i am using different values
  
  const handleSubmit = (e) => {
    e.preventDefault();
   if (!name) {
   //display alert
   showAlert(true,'danger', 'please enter value')
   }
   else if (name && isEditing) {
  //DEAL WITH EDIT, despues de crear la function toca trabajr con el form
    setList(list.map((item) => {
      if (item.id === editID) {
        return {...item, title:name}
      }
      return item
    }))
    setName('')
    seteditID(null)
    setIsEditing(false) //con esto cambio el boton
    showAlert(true,'success', 'valued changed')
  }
  else {
    // show alert
    showAlert(true,'success', 'added')
    const newItem = { id: new Date().getTime().toString(),title:name}
    setList([...list,newItem])
    setName('');
   
  }

  }
  //function for alert
  const showAlert = (show=false,type="",msg="") => {
    setAlert({show,type,msg})  //es como decir show:show,type:type
  }
  //function edit

  const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id)
      setIsEditing(true)
      seteditID(id);
      setName(specificItem.title)
  }

  //function delete
  const deleteItem = (id) => {
     const newItem = list.filter(item => item.id !== id)
     setList(newItem)
  }

  //LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list))
  
    
  }, [list])
  
  
  return <section className="section-center">
    <form className='grocery-form' onSubmit={handleSubmit}>
     {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
     <h3>grocery bud  </h3>
     <div className="form-control">
      <input type='text' className='grocery' placeholder='bananas' value={name} onChange={(e) => setName(e.target.value)}></input>
      <button type='submit' className='submit-btn'>

        {isEditing ? 'edit' : 'submit'}
      </button>
      </div>
    </form>
<div className="grocery-container">
  <List list={list} deleteItem={deleteItem} editItem={editItem}/>
  <button className="clear-btn">
    clear items
  </button>
</div>
  </section>
}

export default App
