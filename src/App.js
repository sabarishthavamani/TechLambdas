import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Purchaseview from './components/purhaseView/Purchaseview';
import Purchase from './components/purchase/Purchase';
import Addproduct from './components/purchase/Addproduct';

function App() {
  return (
    <>
   <main>
   
    <Routes>
    <Route path='/' element={<Login/>} exact />
    <Route path='/Purchaseview' element={<Purchaseview/>} exact />
    <Route path='/Purchase' element={<Purchase/>} exact />
    <Route path='/Addproduct' element={<Addproduct/>} exact />
    </Routes>
   </main>
   </>
  );
}

export default App;
