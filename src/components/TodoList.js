import React from 'react';

export const TodoList = ({todo,index, completeTodo, deleteTodo})=>{
    const trigerIsCompleted = ()=>{
        completeTodo(index);
  }
  const trigerDeleteTodo = ()=>{
      deleteTodo(index);
  }
    
    return(
        <li style={{textDecoration:todo.isCompleted?"line-through":""}}>
          {todo.text}
          <span className="check-box">
            <input type="checkbox" onChange={trigerIsCompleted} />
            <i className="material-icons" onClick={trigerDeleteTodo}>delete</i>
        </span>
      </li>
    )
  }