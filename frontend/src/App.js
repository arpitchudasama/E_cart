// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import sale_banner from './Components/Assets/new-banner.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/phones' element={<ShopCategory banner={sale_banner} category='Phones'/>}/>
          <Route path='/tablets' element={<ShopCategory banner={sale_banner} category='Tablets' />}/>
          <Route path='/laptops' element={<ShopCategory banner={sale_banner} category='Laptops' />}/>
          <Route path='/Cloths' element={<ShopCategory banner={sale_banner} category='Cloths' />}/>
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
