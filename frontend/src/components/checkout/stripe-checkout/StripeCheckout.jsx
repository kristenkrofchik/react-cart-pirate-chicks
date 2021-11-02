import React, { useState, useContext } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/CartContext';
import PirateApi from '../../../Api';

const StripeCheckout = () => {
    const [email, setEmail] = useState('');
    const { cartItems } = useContext(CartContext);
    const stripe = useStripe();

    //create line items and use email to redirect to Stripe checkout page
    const handleGuestCheckout = async(e) => {
        e.preventDefault();
        let line_items = []; 
        for(let item of cartItems) {
            item = {
                quantity: item.cartQuantity,
                price_data: {
                    currency: "usd",
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.name,
                        description: item.description,
                    }
                }
            }
            line_items.push(item);
        };

        let data = {
            line_items: line_items,
            customer_email: email
        }

        const resp = await PirateApi.fetchFromAPI(data);

        const sessionId = resp.sessionId;

        //if success redirect to success page
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
                onChange={e => setEmail(e.target.value)} 
                placeholder='Email' 
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