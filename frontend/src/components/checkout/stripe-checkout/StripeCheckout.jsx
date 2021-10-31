import React, { useState, useContext } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/CartContext';
import { fetchFromAPI } from '../../../Helpers';

const StripeCheckout = () => {
    const [email, setEmail] = useState('');
    const { cartItems, total } = useContext(CartContext);
    const stripe = useStripe();

    //create line items and use email to redirect to Stripe checkout page
    const handleGuestCheckout = async(e) => {
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

        const resp = await fetchFromAPI('checkouts/create-checkout-session', {
            body: { amount_total: total, line_items, customer_email: email },
        });

        const { sessionId } = resp;

        const { error } = await stripe.redirectToCheckout({
            sessionId
        });

        if (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleGuestCheckout}>
            <div>
                <input 
                type='email' 
                onChange={e => setEmail(e.target.value)} placeholder='Email' 
                value={email} 
                className='pirate-input' />
            </div>
            <div className='submit-btn'>
                <button 
                type='submit' 
                className='button is-black pirate-btn submit'>
                    Checkout
                </button>
            </div>
        </form>
    )
}

export default StripeCheckout;