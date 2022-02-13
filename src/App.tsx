import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./pages/Root";
import Details from "./pages/Details";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route index element={<Root />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));