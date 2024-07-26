import React from 'react';
import Navbar from './components/nav';
import Home from "./components/home";


function App() {
  return (
    <div className="min-h-screen flex flex-col flex-1">
      <Navbar />
      
        <Home />
    </div>
  );  
}

export default App;
