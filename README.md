# Todo Application using React-JS
## Creating react app & running development server
Open your work folder in your current terminal application and run below
```Javascript
npx create-react-app todo-app
```
Now change your terminal to todo-app application folder
```Javascript
cd todo-app 
```
To open our todo-app in a VSC text editor run below in your comman line
```Javascript
code .
```
And start development server for realtime changes
```Javascript
npm start
```
Our todo app will look like this [todo-app](http://localhost:3000/)

All react applications are building on the omponent concept. I am dividing our todo-app in four parts 
1. Main app
2. TodoForm component
3. TodoList component
4. Style sheet

### Main app
Main app is responsible for 
1. Rendering UI elements
2. Handling Global state - todo list
3. Functionality to the todo-app
    1. Add todo 
    2. Complete todo
    3. Delete todo

TodoForm is responsible for

1. Creating Form elements to add new todo
2. Creating new local state and managing local data
3. Adding functionality to todos form
3. Generating events to pass child state to parent

TodoList is responsible for 

1. Rendering list of todos state
2. Generating events to pass complete status to parent state
3. Generating events to pass delete todo from parent state

Style sheet is responsible for providing look and feel to our todo form and list

### Modify App.js
Since we don't need rect logo in our todo-app, delete `import logo from './logo.svg';` statement from App.js. Also delete everything inside `<div className="App"></div>` and
add `<h1>Todo App</h1>` to the root div in App.js
Now check the local host, h1 Todo App is rendered now.

Now it is the time to create TodoForm.js & TodoList.js Components. Create new folder `components` inside `src` folder and create `TodoForm.js` & `TodoList.js`

In TodoForm.js we will add basic user interface using form html element.

_src>components>TodoForm.js_
```Javascript
import React from 'react';
export default function TodoForm(){
    return (
      <form className="todo-form">
        <div className="form-group">  
          <div className="input-group-prepend">  
            <input type="text" className="form-control" placeholder="Add Todo"/>
            <span className="input-group-text"><i className="material-icons">add</i></span>
          </div>
        </div>
      </form>
    )
  }
  ```
Now import this TodoForm component to App.js and add below h1 tag

_src>App.js_
```Javascript
import React from 'react';
import TodoForm from './components/TodoForm'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm />
    </div>
  );
}

export default App;
```
Now we should create a local state to store the value from TodoForm input element and bind it to the `value` attribute of input text box. In order to manage local state bring `useState` from `react` package. Create `value` state and `setValue` method and initialize value variable with empty string using `useState()`. Also add value change event `onChange` event to input element

_src>components>TodoForm.js_
```Javascript
import React, { useState } from 'react';
export default function TodoForm(){
    const[value,setValue] = useState("");
    return (
      <form className="todo-form">
        <div className="form-group">  
          <div className="input-group-prepend">  
            <input type="text"className="form-control" placeholder="Add Todo" value={value} onChange={e =>setValue(e.target.value)}/>
            <span className="input-group-text"><i className="material-icons">add</i></span>
          </div>
        </div>
      </form>
    )
  }
  ```
We have added one `add` button near to text box inorder to add our todo local state to global app state. But it is not looks like add icon, for that add google material icon and add some bootstrap to the `index.html` file.

_public>index.html_
```html
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
Now add `click` event to `add` button handle the form submission.

_src>components>TodoForm.js_
```html
<span className="input-group-text" onClick={handleSubmit}><i className="material-icons">add</i></span>
```
Here we created one handleSubmit function and attached to onClick react event. But in our TodoForm functional component we dont have `handleSubmit()`. We can create it now. But only with a handleSubmit() we could not add local value state to parent todolist in` App.js` which is not yet created. For acheiving that we can pass our parent `addTodo()` to child TodoForm as a property and then we will call `addTodo()` function on `onClick={handleSubmit}` event of add button. In `addTodo()` method we need to pass our value as argument. Before calling `addTodo()` check wether user has a valid input in the todo text and after calling `addTodo()`, change the value of `value` state to empty using `setValue("")`. Create handleSubmit in TodoForm also destructure addTodo from the props object in TodoForm.

_src>components>TodoForm.js_
```Javascript
export default function TodoForm({addTodo}){
    ....
    ....
const handleSubmit = (e)=>{
      e.preventDefault();
      if(!value)return;
      addTodo(value);
      setValue("");
    }
```
We need to add `handleSubit` method to form's `onSubmit` attribute if an user submit todo form by pressing enter button.

_src>components>TodoForm.js_
```html
<form className="todo-form"onSubmit={handleSubmit}>
    ....
    ....
</form>
```
Now if you submit form it will raise an error `TypeError: addTodo is not a function` because we dont have such a function `App.js`. 

Now we can modify App.js to handle global state change. So far we donot have a global state for todos.
Create one todos array using useState hooks and initialise todos state with some dummy data. Our todo state will be an object with one text property and completeTodo status, boolean property

_src>App.js_
```Javascript
import React, { useState } from 'react';
...
...
const [todos, setTodo] = useState([{text:"todo1", isCompleted:false}, {text:"todo2", isCompleted:false}]);
```
Add one addTodo()method to App.js to handle state change. Still we cannot modify the global state todos using local state. Pass addTodo() as a props to TodoForm's addTodo attribute `addTodo = {addTodo}`

_src>App.js_
```Javascript
...
const addTodo = (text)=>{
    const newTodo = [...todos, {text,  isCompleted: false}];
    setTodo(newTodo);
  }
...
return(
    ...
    <TodoForm addTodo = {addTodo}/>
    ...
)
```

Now check the `localhost` using react developer tool extension. Add one new todo and verify the state in react developer tool. 

Now we have a todos state array.Disply our current todos in Todo app we have to create TodoList component and import that to App.js. Before modifying App.js, we will finish the `TodoList.js` component.

_src>components>TodoList.js_
```Javascript
import React from 'react';

export const TodoList = ()=>{
    return(
      <li>
        <span className="check-box">
            <input type="checkbox"/>
            <i className="material-icons">delete</i>
        </span>
      </li>
    )
  }
  ```
  We just created basic `html` li element with input checkbox and one delete icon. But still we did not add any todo list state from main `App.js`
  We can pass our Global `todos` state from App.js. We just created one `li` template in `TodoList.js` component. Using one `li` we will be able to render only one todo item from our global `todos` state.
  For rendering all todo list in our Todo App, we can call a javascript `map` method on our `todos` array which is our global state store and  create one `ul` element and call our `li` template that is `TodoList` component inside the map method. In each iteration of map method, pass individual todo state as a property of TodoList component. 

Next we will add TodoList component to App.js

_src>App.js_
```Javascript
import {TodoList} from './components/TodoList'

<div className="data container">   
    <ul className="list-instyled"> 
    {
        todos.map((todo,index)=>{
        return <TodoList key={index} index={index} todo={todo}/>
        })
    }
    </ul>
</div>

```
We just added one `key` props because `map` function need one `key`, one `index` props to use inside list and on one `todo` props in order to render our todo text. If we check `localhost` now, we can see our `TodoList` rendering our list component without any todo text and by adding new todo our list tree will grow up.

Just add `{todo.text}` below the list and destructure todo and index from props in TodoList component
_src>components>TodoList.js_
```Javascript
import React from 'react';

export const TodoList = ({todo,index})=>{
    return(
      <li>
      {todo.text}
        <span className="check-box">
            <input type="checkbox"/>
            <i className="material-icons">delete</i>
        </span>
      </li>
    )
  }
  ```
In our todo list we added one check box and delete button to handle status change and todo item deletion. First we will create these two methods `completeTodo() `and `deleteTodo()` methods in `App.js`

_src>App.js_
```Javascript
...
    const completeTodo = (index)=>{
        //console.log(index)
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodo(newTodos);
    }

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
...
```
We have created methods to handle status change and delete todos but not yet bound with `TodoList` component for that modify the `TodoList` component like this

_src>App.js_
```Javascript
...
return(
<TodoList key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
)
...
```

To complete the method binding, modify TodoList component's parameter list with destructured `props` like below

_src>components>TodoList.js_
```Javascript
import React from 'react';

export const TodoList = ({todo,index,completeTodo,deleteTodo })=>{

```
 Now its time to create two methods inside `TodoList` to  trigger the parent delete and complete method from `TodoList` component and attach that methods to corresponding events that is `onChange` of check box and `onClick` on delete icon

_src>components>TodoList.js_
```Javascript
...
const trigerIsCompleted = ()=>{
      completeTodo(index);
}
const trigerDeleteTodo = ()=>{
    deleteTodo(index);
}

...
<span className="check-box">
    <input type="checkbox" onChange={trigerIsCompleted} />
    <i className="material-icons" onClick={trigerDeleteTodo}>delete</i>
</span>
...
```
Check the `localhost` for the updated functionality of delete button and status check box. But you cannot see the status change in the UI. if you check in react inspector, we can see the `state` with a `boolean` isCompleted value.

To disply status change in UI modify the li, add one style attribute to the li in TodoList.js

_src>components>TodoList.js_
```Javascript
<li style={{textDecoration:todo.isCompleted?"line-through":""}}>
```
Now chek the UI and toggle the status

At this point, we have created our basic UI and add all base functionality to it. Now remainng is the styling and persistence of our state. Since we are not using any back end REST api or database, i am planning this todo with local storage web api. If you want to know more about [Local storage in web API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Adding and retrieving data to and from `locaStorage`, its better to use `useEffect` hooks in react. Effectively these
`useEffect(()=>{},[])` and `useEffect(()=>{})` are equivalent to `componentdDidMount()` and `ComponentDidUpdat()` class based component life cycle. We will see that

_src>App.js_
```Javascript
import React, { useState, useEffect } from 'react';
...
  useEffect(() => {
    let storedTodo = localStorage.getItem("todos");
    setTodo(storedTodo?JSON.parse(storedTodo):[])
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
    //console.log(localStorage.getItem("todos"));
  })
...
```
Now check the `localhost` if you are setting first the localStorage using our current domain, you will not see anything in the UI because we have nothing in our `localStorge`, you can see our dummy global state todos also removed from the UI. At this stage you can remove that dummy state from App.js

_src>App.js_
```Javascript
...
 const [todos, setTodo] = useState([]);
...
 ```
Now add some todos and reload localhost for data persistence.

Better we will add our styles at this stage. Modify `App.css`
_src>App.css_
```css
@import url('https://fonts.googleapis.com/css?family=Raleway');
.data{    
  margin-top: 1em;
}
.list-instyled{
  list-style: none;
  padding-left: 0%;
}
li{ 
  background: #fff; 
  border-left: 4px solid #F97300; 
  padding: 1em; margin: 1em auto; 
  color: #666; 
  font-family: "Raleway";
  position: relative;
}
.check-box{
  float: right;    
  color: #888;    
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  /* position: fixed; */
  margin-top: -10px;
}
.todoApp{
  margin: 1em auto; 
  background: #f4f4f4; 
  padding: 2em 3em;

} 
.check-box i{
  padding: 10px;
}
.check-box input[type=checkbox]{
  margin-top: -20px;
}
h1{
font-family: "Raleway";    
color:#F97300 !important; 
text-align: center;
}
form{
  width: 50%;
  margin: 1em auto;
  position: relative; 
  background: #f4f4f4; 
  padding: 2em 3em;
}
form input[type=text]::placeholder{   
  font-family: "Raleway";   
  color:#666; 
}
.input-group-text{  
  background: #F97300;    
  border-radius: 50%;    
  color: #fff;        
  cursor: pointer;
  font-size: 2em;
  margin-left: 5px;
}
form .form-control{ 
  height: 3em;    
  font-family: "Raleway";
}
form .form-control:focus{ 
  box-shadow: 0;
}
```

Now our Todo App looks much more better. We added all our state and functionality to our Todo App. 

Now we will build our application for production and deployment. Run `npm run build` in your terminal window which opened in our current Todo App.

This will create build folder in our todo-app folder. Next open your [netlify](https://www.netlify.com/) accont and drag and drop our build folder into the dropzone as mentioned in the account. That much simple, now you have your live Todo App application. Check and share with your client.

I hope this session of making a simple todo App give you a basic understanding of `useState` and `useEffects` hooks and spliting big chunks of code into small component tree. You can find the complete code in this github repo. 




