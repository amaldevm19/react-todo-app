import React, { useState } from 'react';
export default function TodoForm({addTodo}){
    const[value,setValue] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!value)return;
        addTodo(value);
        setValue("");
      }
    return (
        <form className="todo-form"onSubmit={handleSubmit}>
        <div className="form-group">  
          <div className="input-group-prepend">  
            <input type="text"className="form-control" placeholder="Add Todo" value={value} onChange={e =>setValue(e.target.value)}/>
            <span className="input-group-text" onClick={handleSubmit}><i className="material-icons">add</i></span>
          </div>
        </div>
      </form>
    )
  }