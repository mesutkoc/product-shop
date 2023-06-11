import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsTable from './Components/ProductsTable';
import './App.scss';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path='/dashboard' element={<ProductsTable></ProductsTable>}></Route>
      </Routes>
    </div>
  );
}

export default App;
