import { useState, useEffect } from 'react'
import { TodoProvider} from "./Context"
import './App.css'
import TodoItem from './Components/TodoItems'
import TodoForm from './Components/TodoForm'
import { TodoContext } from './Context'

function App() {
  const [todos,setTodos] = useState([]) // initially, the todo list is empty

 // Functionalities - 

 // functionality for adding a todo -
 const addTodo = (todo) => {
   setTodos((prev)=>[{id:Date.now(), ...todo},...prev])
 }

 // functionality for updating a todo - 

 const updateTodo = (id,todo) => {
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id
       === id ? todo:prevTodo)))
 }
 // functionality for deleting a todo - 

 const deleteTodo = (id) => {
     setTodos((prev)=> prev.filter((todo)=>todo.id !== id))
 }
 
  // functionality for toggling a todo as complete  -
  const toggleComplete = (id) => {
    setTodos((prev)=>prev.map((prevTodo) => (prevTodo.id
    === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
  }
  
  useEffect(() => {
   const todos = JSON.parse(localStorage.getItem("todos")) 
    if(todos && todos.length > 0 ){
      setTodos(todos)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))  //key will be same as the name you provided in getItem method in line 34. stringify converts json into string.
  
  },[todos])
  

  return (
    // wrapped in TodoProvider -

    < TodoProvider value={{todos, addTodo,updateTodo,deleteTodo,toggleComplete}}> 
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-3xl font-bold text-center mb-8 mt-2">Manage Your Market List</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </ TodoProvider>
  )
}

export default App
