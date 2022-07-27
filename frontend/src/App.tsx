import React from 'react';
import UserForm from "./UserForm";
import DisplayUsers from "./DisplayUsers";
import './App.css';



function App() {

    return (
    <div className="App">
        <DisplayUsers></DisplayUsers>
        <UserForm></UserForm>
    </div>
  );
}

export default App;
