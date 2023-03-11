import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    fetch("http://localhost:5000/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newTodo,
        description: newNote,
      }),
    });
    setNewNote("");
    setNewTodo("");
  };
  return (
    <div>
      <form onSubmit={handleClick}>
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-2 col-form-label">
            Todo
          </label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control" value={newTodo} onChange={handleTodoChange}></input>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label">
            Note
          </label>
          <div class="col-sm-10">
            <input class="form-control" value={newNote} onChange={handleNoteChange}></input>
          </div>
        </div>
        <div>
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
      <br></br>
      <button
        class="btn btn-dark"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default AddTodo;
