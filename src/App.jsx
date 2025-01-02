import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
//this is we adding 1 todo by not changing the previous one spreading the previous todo and the current todo .
  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo}, ...prev] )
  }
// konsa asa todo ha jo id se match kara ha match kara ha toh todo naya jod denge nahi toh pichle wali ki trh rehne denge 
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo ))) 
  }
//jo jo id se match nahi krega ata jayega jo match kar jayega woh bhar 
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
// jojo id se match hua use sabko spread krke completed ka opposite krdenge agr match nahi hua toh pehle jesa hi rehne denge 
  const toggleComplete = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  // this is localstorage get item parsing into json format then if todos present adding into settodos
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  //now local storage setitem by key and value in string 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="  h-screen bg-[#172842] py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      
                        <TodoForm />

                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App