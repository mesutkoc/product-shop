import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import Dashboard from './Components/Dashboard';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </div>
  );
}

export default App;
