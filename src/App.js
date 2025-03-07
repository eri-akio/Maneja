import React from 'react';
import './App.css';
import HierarquiaObjetivos from './components/HierarquiaObjetivos';
import MenuLateral from './components/MenuLateral';

function App() {
    return (
      <div className="App">
            <MenuLateral className="MenuLateral" />
            <HierarquiaObjetivos className="HierarquiaObjetivos" />
      </div>
    );
}

export default App;
