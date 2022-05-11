import React from 'react';
import Button from 'react-bootstrap/Button';
import { AuthProvider } from './context/authContext';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Login></Login>
      </AuthProvider>
    </div>
  );
}

export default App;
