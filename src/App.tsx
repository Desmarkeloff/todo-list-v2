import { useEffect, useState } from 'react';
import './styles.css';
import Swal from 'sweetalert2';
import { useFetch } from '../hooks/useFetch';
import axios from 'axios';
// import axios from 'axios';


const App = () => {

  interface Todo {
    _id?: number | undefined,
    name: string,
    done: boolean;
  };


  const queryUrl: string = "http://localhost:8080/api/todos";
  const { data } = useFetch(queryUrl);
  const [query, setQuery] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todos === undefined) {
      return;
    }
    //Check if todo isn't twice.
    let alreadyExist: boolean = false;
    for (let i = 0; i < todos.length; i++) {
      if (query.trim() === todos[i].name) {
        alreadyExist = true;
      }
    }

    if (alreadyExist) {
      Swal.fire({
        title: 'That todo already exists!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setQuery("");
      return;
    }

    //check if todo isn't empty.
    if (query.trim().length === 0) {
      Swal.fire({
        title: 'Your todo is empty!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    const newTodo: Todo = {
      name: query,
      done: false
    };

    const previousTodo: Todo[] = todos;

    const res = await axios.post(queryUrl, newTodo);

    const addedTodo = res.data;

    setTodos([...previousTodo, addedTodo]);
    setQuery('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDelete = async (id: number | undefined) => {
    if (todos === undefined) return;

    const updatedList = todos.filter(todo => todo._id !== id);
    await axios.delete(`${queryUrl}/${id}`)
      .catch(error => {
        console.error(error.response.data);
      });
    setTodos(updatedList);
  };

  const handleToggle = async (id: number | undefined) => {
    if (todos === undefined) return;
    const updatedList = todos.map((todo: Todo) => (todo._id === id ? { ...todo, done: !todo.done } : todo));

    const todo = todos.find(todo => todo._id === id);
    if (todo !== undefined) {
      todo.done = !todo.done;
    }
    await axios.put(`${queryUrl}/${id}`, todo)
      .catch(error => {
        console.error(error.response.data);
      });

    setTodos(updatedList);
  };

  return (
    <div className="todo-container">
      <div className="todo-wrap">
        <form className="todo-form" onSubmit={e => handleSubmit(e)}>

          <h1 className="todo-title">MY TODO-LIST</h1>
          <label htmlFor="todo-input" className="todo-input-label">Add any todo you want!   ;)</label>
          <input
            id="todo-input"
            className="todo-input"
            type="text"
            placeholder="My Todo"
            autoFocus
            value={query}
            onChange={(e) => handleChange(e)}
          />
        </form>
        {
          todos === undefined
            ? "Loading..."
            : <div className="todo-list">
              {todos.map(todo => (
                <div key={todo._id} className="todos">
                  <div onClick={() => handleToggle(todo._id)} className={todo.done === true ? "todo-done" : "todo"}><li>{todo.name}</li></div>
                  <div onClick={() => handleDelete(todo._id)} className="todo-delete">X</div>
                </div>
              ))}
            </div>
        }
      </div>
    </div >
  );
};
export default App;