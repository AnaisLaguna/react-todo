import { useState } from "react";

export default function App() {
  //lista de todos (se guarda el valor del input )
const [todos, setTodos] = useState([]);
const [text, setText] = useState("");

function addTodo() {
 setTodos([ ...todos,text]);
}

function removeTodo(indexToRemove){
  //todos.splice(indexToRemove, 1)
  //setTodos([...todos])
  //otra forma
  
  const newTodos = todos.filter((todo, idx) => idx !== indexToRemove);
  setTodos(newTodos);
  
}

function onSubmit(event){
event.preventDefault();
addTodo();
setText("");
}

  return (
    <main className="w-full min-h-screen flex flex-col">
      <form 
      className="flex flex-row gap-2 justify-center p-5"
      onSubmit={onSubmit}
      >
        <input 
          name="todo"
          type="text" 
          className="p-2 rounded-md text-black w-full max-w-screen-sm"
          placeholder="Ingresa una tarea" 
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
        <button className="bg-white text-black px-3 rounded"> + Agregar</button>
      </form>

      <div className="max-w-screen-sm w-full mx-auto p-4 flex flex-col gap-1">
        {
          todos.length=== 0 && <p className="text-white/50">No tienes tareas pendientes 🤷‍♀️</p>}
          {todos.length > 0 && 
            todos.map((todo, idx) => {
            return (
            <div key={`todo-${idx}`} 
            className="bg-white/10 rounded p-4 flex flex-row justify-between"
            >
              <span className="select-none">{todo}</span>
              <span 
              className="text-red-500 cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1 size-5 text-center items-center flex" 
              onClick={() => removeTodo(idx)}> 
                X 
                </span>
            </div>
          );
         })}
      </div>
    </main>
    
  );
}
