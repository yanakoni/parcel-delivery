import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { Typography } from '@mui/material';
import axios from 'axios';
import { showNotification } from '../../utils';
import { ROUTES } from '../../consts';
import { useNavigate } from 'react-router-dom';

interface PaymentPageProps {
  packageId: string;
  price: number;
}

const PaymentPage = ({ packageId, price }: PaymentPageProps) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement as StripeCardElement,
    });

    if (error) {
      console.log(error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const { data } = await axios.post('http://localhost:3001/payment', null, {
        params: { amount: price, paymentMethodId: paymentMethod?.id, packageId },
      });

      if (data.status) {
        showNotification('Payment successful', 'success');
        navigate(ROUTES.DASHBOARD);
      }
      // Here you would send the paymentMethod.id to your server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Total: {price}</Typography>
      <CardElement
        options={{
          style: {
            base: {
              padding: '10px 12px',
              iconColor: '#c4f0ff',
              color: '#000000',
              fontWeight: '500',
              fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              ':-webkit-autofill': {
                color: '#fce883',
              },
              '::placeholder': {
                color: '#0d4ca2',
              },
            },
            invalid: {
              iconColor: '#8b3636',
              color: '#a52121',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export { PaymentPage };
