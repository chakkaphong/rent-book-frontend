import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import PrivateRoute from "./auth/PrivateRoute";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <BookList />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <PrivateRoute>
              <BookDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/create"
          element={
            <PrivateRoute>
              <CreateBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/books/update/:id"
          element={
            <PrivateRoute>
              <UpdateBook />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
