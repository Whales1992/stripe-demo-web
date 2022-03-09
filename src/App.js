import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import {loadStripe} from '@stripe/stripe-js';

const App = () => {

  const [stripe, setStripe] = useState(null);

  useEffect(()=>{
    async function getStripe(){
      setStripe(await loadStripe('pk_test_51Iy0VbBoyr3wFNUPFBNY7Z7l1DsIpOfKZMXQz5vElP7mXXpYjbfg5LeGmeSYlJEaK0VPAC1rhLuKro4u2PQnImyp001lJqzEA1'))
    }
    getStripe();
  }, []);

  const testStripeConfirmDebit = (client_secret, name, email)=>{
    if(stripe===null) return;

    console.log("STRIPE === ", stripe);

    stripe.confirmAcssDebitPayment(client_secret,{
        payment_method: {
          billing_details: {
            name: name,
            email: email,
          },
        },
      }
    ).then(function(result) {
      if (result.error) {
        // Inform the customer that there was an error.
        console.log(result.error.message);
      } else {
        // Handle next step based on PaymentIntent's status.
        console.log("PaymentIntent ID: " + result.paymentIntent.id);
        console.log("PaymentIntent status: " + result.paymentIntent.status);
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={()=>testStripeConfirmDebit("pi_3KWjUhBoyr3wFNUP3zvVyhM0_secret_rAyo5ioJ71ltyblbx9eivEYzQ", "Wale", "tvterryboy1@gmail.com")}>
          Activate Lasers
        </button>
      </header>
    </div>
  );
}

export default App;
