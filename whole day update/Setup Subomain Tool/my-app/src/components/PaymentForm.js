import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RPNyEPLqAJ6ZY6FVvbG5k5mSZcEmXZAhGi7ZrGjlbjvR54SzY8OsIGTUzc4UVWt4O5QMdO6nJcr1CmJYNqr4Feo00bV81kqpE'); // Replace with your publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  const handlePayment = async () => {
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
    } else {
      console.log('Payment successful:', paymentIntent);
      alert('Payment successful!');
    }
  };

  const createPaymentIntent = async () => {
    try {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 5000 }),
          });
          const data = await response.json();
          console.log(data);
          setClientSecret(data.clientSecret);
    } catch (error) {
        console.log(error);
    }
   
  };

  return (
    <div>
      <button onClick={createPaymentIntent}>Create Payment Intent</button>
      {clientSecret && (
        <div>
          <CardElement />
          <button onClick={handlePayment}>Pay</button>
        </div>
      )}
    </div>
  );
};

const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm;