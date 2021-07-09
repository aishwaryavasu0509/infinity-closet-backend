import React, { useState } from 'react'; //useState is optional
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product, setproduct] = useState({
    name: 'testProduct',
    price: 10,
    productBy: 'IC'
  });

  const makePayment = (token) => {
    const body = {
      token,
      product
    };
    const header = {
      'Content-Type': 'application/json'
    };

    return fetch(`http://localhost:5001/payment`, {
      method: 'POST',
      header,
      body: JSON.stringify(body)
    })
      .then((response) => {
        console.log('RESPONSE', response);
        const { status } = response;
        console.log('STATUS', status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className='App'>
        <h1>hello</h1>
        <StripeCheckout
          stripeKey='pk_test_51J7HSYSEC2Zw83Q8aoHlZVekCpvEcUps4brId0aqkZPskKWxEqy3cWkElRHrBz3n0S07Ib4dJzxAJB0GiizbEVMR00wImB8Cse'
          token={makePayment}
          name='Buy product testProduct'
          amount={product.price * 100}
        />
      </div>
    </>
  );
}
// {process.env.REACT_APP_STRIPE_KEY}
export default App;
