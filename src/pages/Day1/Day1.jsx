import { useState } from 'react';
import './Day1.scss';
import { Link } from 'react-router-dom';

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
    <div className='todo'>
        <div className='todo__box1'>
             <p className='todo__title'><Link to="/">Back</Link></p>
             <div className='todo__title'>Todo-List App</div>
         </div>
        <form className='todo__form' onSubmit={handleSubmit}>
            <label className='todo__label' htmlFor="todo">Enter your todo item</label>
            <input className='todo__input' type="text" name="todo" id="todo" value={todo} onChange={handleTodos}/>
            <button className='todo__button' type="submit">Add item</button>
        </form>
        <div>
                <div className='todo__title'>TodoList</div>
                {todoList.length === 0 ? 
                    (
                        <p>No items in the list. Try adding a todo item!</p>
                     ) : 
                     (todoList.map((item,index) => {
                            return(
                                <>
                                
                                    <div className='todo__list' key={index}>
                                    <p className='todo__para' >🌟 {item.text}</p>
                                    <button className='todo__button' onClick={()=>handleDelete(index)}>Delete</button>
                                    <button  className='todo__button' onClick={()=>handleComplete(index)}>{item.completed? 'Marked Complete' : 'In Progress'}</button>
                                    </div>
                                
                                </>
                            )
                     }
                    )) }
        </div>

    </div>
    </>
  )
}

export default Day1