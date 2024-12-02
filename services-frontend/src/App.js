  import logo from './logo.svg';
  import './App.css';
  import React from 'react';
  import { useState, useEffect } from 'react';
  import PropertyList from './pages/admin/propertyList';
  import MachineList from './pages/users/machineList'
  import { Routes, Route } from 'react-router-dom';


  function App() {


    return (
      <div className="App">
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:id" element={<MachineList />} />
      </Routes>
      </div>
    );
  }

  export default App;
