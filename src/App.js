import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import {TodoList} from './components/TodoList';

import './App.css';

function App() {
  const [todos, setTodo] = useState([{text:"todo1", isCompleted:false}, {text:"todo2", isCompleted:false}]);
  const addTodo = (text)=>{
    const newTodo = [...todos, {text,  isCompleted: false}];
    setTodo(newTodo);
  }
  const completeTodo = (index)=>{
    //console.log(index)
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodo(newTodos);
}
useEffect(() => {
  let storedTodo = localStorage.getItem("todos");
  setTodo(storedTodo?JSON.parse(storedTodo):[])
},[])
useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos));
  //console.log(localStorage.getItem("todos"));
})

function deleteTodo(index){
    let newTodos = [...todos];
    newTodos = newTodos.filter((item, itemindex)=>{
    //console.log(itemindex)
    return (
        itemindex !== index
    );
    })
    setTodo(newTodos);
}
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm addTodo = {addTodo}/>
      <div className="data container">   
        <ul className="list-instyled"> 
        {
          todos.map((todo,index)=>{
            return<TodoList key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
          })
        }
        </ul>
      </div>
    </div>
  );
}

export default App;
