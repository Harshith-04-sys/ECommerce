// App.js - Main application component
// Responsibilities:
//  - Fetch application-level configuration (e.g., Stripe API key)
//  - Dispatch initial actions (load authenticated user)
//  - Define client-side routes and protect admin/user routes
import './App.css';
import Home from './components/Home';
import Landing from './components/Landing';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';

function App() {
  // Load Stripe publishable key (used by the client to initialize Stripe Elements)
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    // Dispatch user loader to check for existing authenticated user (JWT in cookie)
    store.dispatch(loadUser)

    // Fetch Stripe API key from backend (keeps secret keys server-side)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
            <Header/>
                <div className='container container-fluid'>
                  <ToastContainer theme='dark' />
                    <Routes>
                      <Route path='/' element={<Landing/>} />
                      <Route path='/shop' element={<Home/>} />
                      {/* Product search route uses `keyword` param — ProductSearch reads it and dispatches getProducts */}
                      <Route path='/search/:keyword' element={<ProductSearch/>} />
                      <Route path='/product/:id' element={<ProductDetail/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
                      <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
                      <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
                      <Route path='/password/forgot' element={<ForgotPassword/> } />
                      <Route path='/password/reset/:token' element={<ResetPassword/> } />
                      <Route path='/cart' element={<Cart/> } />
                      <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute> } />
                      <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } />
                      <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> } />
                      <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
                      <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
                      {/* Only enable payment route if Stripe key has been loaded */}
                      {stripeApiKey && (
                        <Route
                          path='/payment'
                          element={
                            <ProtectedRoute>
                              <Elements stripe={loadStripe(stripeApiKey)}>
                                <Payment />
                              </Elements>
                            </ProtectedRoute>
                          }
                        />
                      )}
                  </Routes>
                </div>
                {/* Admin Routes */}
                <Routes>
                  <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
                  <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
                  <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
                  <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
                  <Route path='/admin/orders' element={ <ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } />
                  <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
                  <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
                  <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
                  <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } />
                </Routes>
            <Footer/>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
