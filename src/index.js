import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import Todo from "./components/Todo";
import EditTodo from "./components/EditTodo";
import AddTodo from "./components/AddTodo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Todo />} />
          <Route path="/Add" element={<AddTodo />} />
          <Route path="/Edit/:id" element={<EditTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
