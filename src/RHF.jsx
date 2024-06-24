import { useState } from "react";
import {useForm} from 'react-hook-form';
import clsx from "clsx";

export default function RHF() {
  //lista de todos (se guarda el valor del input )
const [todos, setTodos] = useState([]);
//const [text, setText] = useState("");

const {
    register, 
    handleSubmit, 
    formState: {errors, isValid, isSubmitted }, 
    reset,
} = useForm();


function removeTodo(indexToRemove){
  //todos.splice(indexToRemove, 1)
  //setTodos([...todos])
  //otra forma
  
  const newTodos = todos.filter((todo, idx) => idx !== indexToRemove);
  setTodos(newTodos);
  
}
/**
 * data: es un objeto que contiene en cada propiedad el valor de cada input del formulario
 * data.todo -> valor del input name="todo"
 */

function onSubmit(data) {
    console.log("onSumbit");
    setTodos([...todos, data.todo]);
    reset();

}

  return (
    <main className="w-full min-h-screen flex flex-col">
        <p className="w-full bg-teal-500  text-black font-bold text-center p-2"> 
            TO-DO React-hook-form 
        </p>
      <form 
      className="flex flex-row gap-2 justify-center p-5"
      onSubmit={handleSubmit(onSubmit)}
      >
        <input 
          type="text" 
          className={clsx("p-2 rounded-md text-black w-full max-w-screen-sm" ,{
            'border-2 border-red-500 bg-red-300' : errors.todo,
          })}
          placeholder="Ingresa una tarea" 
          required
          {...register("todo", {
            required: { value: true, message: "campo requerido" },
            minLength: { value: 3, message: "Minimo 3 caracteres" },
            maxLength: { value: 180, message: "maximo 180 caracteres" },
          })}
        />
        <button 
            className="text-black px-3 rounded bg-stone-400"
            disabled={isSubmitted ? !isValid: false}
        > 
            + Agregar
        </button>
      </form>

        {errors.todo && (
      < p className="text-red-500 text-center text-sm font-semibold  ">
        {errors.todo?.message}
      </p>
      )}

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
