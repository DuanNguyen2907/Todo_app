import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  let url = "http://localhost:5000/task/list";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  const handleCheckboxClick = (id, status) => {
    let change;
    if (status === 2) {
      change = 1;
    } else {
      change = 2;
    }
    id = id.toString();
    fetch("http://localhost:5000/task/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // your request data goes here
        id: id,
        status: change,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  const handleTodoDelete = (id) => {
    fetch("http://localhost:5000/task/delete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // your request data goes here
        task_id: id,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  const navigate = useNavigate();
  let check;

  return (
    <div>
      <button
        onClick={() => {
          navigate("/Add");
        }}
        class="btn btn-primary"
      >
        Add Todo
      </button>
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => todo.status !== 0 && (
                <tr key={todo.id} style={{textDecoration: todo.status === 2 ? "line-through" : "none",}}>
                  <th>
                    {(check = todo.status === 2)}
                    <input
                      type="checkbox"
                      checked={check}
                      onChange={() => handleCheckboxClick(todo.id, todo.status)}
                    ></input>
                  </th>
                  <td>{todo.name}</td>
                  <td>{todo.description}</td>
                  <td>
                    <button onClick={() => handleTodoDelete(todo.id)} class="btn btn-danger">
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => {
                        let url = "/Edit/" + todo.id;
                        navigate(url);
                      }} class="btn btn-info"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
