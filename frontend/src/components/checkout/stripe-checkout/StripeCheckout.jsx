import React, { useState, useContext } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/CartContext';
import PirateApi from '../../../Api';
import { useContext } from 'react/cjs/react.development';

const StripeCheckout = () => {
    const [email, setEmail] = useState('');
    const { cartItems } = useContext(CartContext);

    const handleGuestCheckout = () => {};

    return (
        <form onSubmit={handleGuestCheckout}>
            <div>
                <input type='email' onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} className='pirate-input' />
            </div>
            <div className='submit-btn'>
                <button type='submit' className='button is-black pirate-btn submit'>
                    Checkout with Stripe
                </button>
            </div>
        </form>
    )
}

export default StripeCheckout;