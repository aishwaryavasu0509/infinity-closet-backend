const cors = require('cors');
const express = require('express');
const { default: Stripe } = require('stripe');
const stripe = require('stripe')(
  'sk_test_51J7HSYSEC2Zw83Q8x5QNI8BAXilJ2xB638eElLn3FPwu9z5z13enEXuPljWfzeyy1ogWQ3ySEbO1nMngAJQpiQCY006YqWNmed'
);
const uuid = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('working');
});

app.post('/payment', (req, res) => {
  const { product, token } = req.body;
  console.log('product', product.name);
  console.log('price', product.price);
  const idempontencyKey = uuid();

  return stripe.CustomersResource.create({
    email: token.email,
    source: token.id
  })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

app.listen(5001, () => {
  console.log('listening on port 5001');
});
