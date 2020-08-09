import React from 'react';
import './App.css';
import Routes from "./router";
import Hoc from "./HOC/hoc";
function App() {
  return (
    <Hoc>
      <Routes/>
    </Hoc>
  );
}

export default App;
