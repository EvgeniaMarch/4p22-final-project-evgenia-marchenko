import './App.css';
import Footer from './components/Footer/Footer';
import Card from './components/Card/Card';
import Contacts from './components/Contacts/Contacts';
import About from './components/About/About';
import Enter from './components/Enter/Enter';
import { Route, Routes } from 'react-router-dom';
import Product from './components/Product/Product';
import DefaultLayout from './components/Layout/DefaultLayout';
import Basket from './components/Basket/Basket';
import RequireAuth from './hoc/requireAuth';
import { AuthProvider } from './hoc/AuthProvider';


function App() {
   return (
    <div className="App">
      
      <div className="App__main">
      <AuthProvider>
        <Routes>
          <Route path={'/'} element={<DefaultLayout />}>
            <Route index path={'/'} element = {<Card />} />
            <Route path={'products'}>
              <Route path={':id'} element={<Product />} />
            </Route>
            <Route path={'contacts'} element={<Contacts />} />
            <Route path={'basket/*'} element={
              <RequireAuth>
                <Basket />
              </RequireAuth>
              } />
            <Route path={'about'} element={<About />} />
            <Route path={'enter'} element={<Enter />} />
          </Route >

          </Routes>
        </AuthProvider> 

      </div>
      <Footer />
      
    </div>
  )  
}
export default App;
