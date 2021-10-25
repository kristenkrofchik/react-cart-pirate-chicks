import React, { useState, useContext } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/CartContext';
import PirateApi from '../../../Api';

const StripeCheckout = () => {
    const [email, setEmail] = useState('');
    const { cartItems } = useContext(CartContext);
    const stripe = useStripe();

    async function handleGuestCheckout(e) {
        e.preventDefault();
        const line_items = cartItems.map(item => {
            return {
                quantity: item.cartQuantity,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: [item.image],
                    }
                }
            }
        });

        const resp = await PirateApi.fetchFromAPI(`create-checkout-session`, {
            body: { line_items, customer_email: email},
        });
        const { sessionId } = resp;
        const { error } = await stripe.redirectToCheckout({
            sessionId
        })

        if (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleGuestCheckout}>
            <div>
                <input type='email' onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} className='pirate-input' />
            </div>
            <div className='submit-btn'>
                <button type='submit' className='button is-black pirate-btn submit'>
                    Checkout
                </button>
            </div>
        </form>
    )
}

export default StripeCheckout;