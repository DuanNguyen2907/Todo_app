import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editName, setEditName] = useState("");
  const [editNote, setEditNote] = useState("");

  const handleTodoChange = (event) => {
    setEditName(event.target.value);
  };
  const handleNoteChange = (event) => {
    setEditNote(event.target.value);
  };

  let url = "http://localhost:5000/task/get?task_id=" + id;
  useEffect(() => {
    axios.get(url).then((res) => {
      setEditName(res.data.data.name);
      setEditNote(res.data.data.description);
    });
  }, [url]);

  const handleClick = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/task/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // your request data goes here
        id: id,
        name: editName,
        description: editNote,
      }),
    });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleClick}>
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Todo
            </label>
            <div class="col-sm-10">
              <input type="text" readonly lass="form-control" value={editName} onChange={handleTodoChange}></input>
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              Note
            </label>
            <div class="col-sm-10">
              <input class="form-control" value={editNote} onChange={handleNoteChange}></input>
            </div>
          </div>
          <div>
            <button class="btn btn-info">Edit</button>
          </div>
        </form>
      </div>
      <br></br>
      <button class="btn btn-dark" onClick={() => { navigate("/");}}
      >
        Back
      </button>
    </div>
  );
};

export default EditTodo;
