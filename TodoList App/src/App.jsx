import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [element, setElement] = useState(true);
  const [inputRef, setInputRef] = useState("");
  const deleteRef = useRef(null);
  const editRef = useRef(null);
  const replaceRef = useRef(null);



  const editHandle = () => {
    if (editRef.current && replaceRef.current) {
      editRef.current.replaceWith(replaceRef.current);
    }
  };

  useEffect(() => {
    if (!element){
      editHandle()
    }
  }, [element])

  const closeHandle = () => {
    if (deleteRef.current) {
      deleteRef.current.remove()
    }
  }
  const submitHandle = () => {
    if (input === "") {
      alert("Fill the box");
      return;
    } else {
      setTodos((enList) => [...enList, input]);
      setInput("");
    }
  };
  return (
    <>
      <div className="container m-10 w-full flex justify-around">
        <input
          className="border-2 rounded border-blue-300 p-3 w-8/12 text-center"
          type="text"
          placeholder="Enter Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="border-red-300 border-2 rounded mx-2 px-2 bg-blue-300 text-white w-4/12 hover:bg-blue-600"
          onClick={submitHandle}
        >
          Submit
        </button>
      </div>
      <ul className="container mx-auto p-4 justify-between w-full">
        {todos.map((todo, index) => (
          <li key={index} className="p-2 border-b-2 flex justify-between" ref={deleteRef}>
            <p className="px-4 item-center" >{element ? (<p ref={editRef}>{todo}</p>): (<p ref={replaceRef}>{inputRef}</p>)}</p>
            <div className="flex w-6/12">
              <button
                className="p-2 border-l-2 rounded-3xl bg-red-200 text-black w-6/12 hover:bg-blue-800 hover:text-white"
                onClick={closeHandle}
              >
                Close
              </button>
              <button
                className="p-2 border-l-2 rounded-3xl bg-red-200 text-black w-6/12 hover:bg-blue-800 hover:text-white"
                onClick={() => setElement(false)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

function App() {
  return (
    <>
      <h1 className="text-blue-500, items-center, text-center">TODO LIST</h1>
      <TodoList />
    </>
  );
}

export default App;
