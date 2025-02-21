import { useState } from 'react';
import './Day1.scss';

const Day1 = () => {
    const [todo,setTodo] = useState("");
    const [todoList,setTodoList] = useState([]);

    const handleSubmit= (e) => {
        e.preventDefault();
        if(!todo){
            alert('Enter the todo item');
            return;
        }
        setTodoList([...todoList,{ text: todo, completed: false }])
        setTodo("");
    }

    const handleTodos = (e) => {
        e.preventDefault();
        setTodo(e.target.value);
    }
    const handleDelete = (index) => {
        const updatedTodoList= todoList.filter((_,i) => i!==index) //.filter() takes a callback function with two parameters: the first (_) represents the current item in the array, and the second (i) is the index of the current item.
        setTodoList(updatedTodoList);
    }
    const handleComplete =(index) => {
        const updatedTodoList = [...todoList]
        updatedTodoList[index].completed = !updatedTodoList[index].completed //switches the completed status 
        setTodoList(updatedTodoList);
    }
  return (
    <>
    <div className='title'>Todo-List App</div>
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="todo">Enter your todo item</label>
            <input type="text" name="todo" id="todo" value={todo} onChange={handleTodos}/>
            <button type="submit">Add item</button>
        </form>
        <div>
                <div>TodoList</div>
                {todoList.map((item,index) => {
               return(
                <>
                    <div key={index}>
                    <p >{item.text}</p>
                    <button onClick={()=>handleDelete(index)}>Delete</button>
                    <button  onClick={()=>handleComplete(index)}>{item.completed? 'Mark Completed' : 'In Progress'}</button>
                    </div>
                </>
               )
            }
            )} 
        </div>

    </div>
    </>
  )
}

export default Day1