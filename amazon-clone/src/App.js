import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Checkout from './Checkout';
import Payment from './Payment';
import Orders from './Orders';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { auth } from './firebase';
import {useEffect} from 'react';
import { useStateValue } from './StateProvider';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";


const promise = loadStripe(
  "pk_test_51Mj3gcHYCc7xvLimqxZOPpU0rCnTLBfyLe93uthyvaLgKNLxnbVrXyPT9jSCyXzhDMy0evCwlFM3l3R8Fra0wLO200aGwBzjQi"
)

function App() {

  const[{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
        console.log('사용자는 다음과 같습니다.' , authUser);
        if(authUser) {
          dispatch({
            type: "SET_USER",
            user: authUser
          })
        } else {
          dispatch({
            type: "SET_USER",
            user: null
          })
        }
    })
  }, [])



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          } />
          <Route path="/orders" element={<Orders/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
