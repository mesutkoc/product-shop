import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { fetchProducts } from './Redux/productSlice';
import { fetchCategory } from './Redux/categorySlice';
import Dashboard from './Components/Dashboard';
import ProductDetail from './Components/ProductDetail';
import Header from './Components/Header';
import './App.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path={`/productdetail/:i`} element={<ProductDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
