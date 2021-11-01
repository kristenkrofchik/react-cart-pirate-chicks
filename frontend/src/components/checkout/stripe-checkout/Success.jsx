import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../shared/Layout';
import { CartContext } from '../../../context/CartContext';

const Success = ({ history }) => {
    const { clearCart } = useContext(CartContext);
    useEffect(clearCart, []);

    return (
        <Layout>
            <div className='checkout'>
                <h1>Thank you for your order from Pirate Chicks Vintage!</h1>
                <p>Your order is being processed. You will be sent a confirmation via email shortly.
                </p>
                <div>
                    <button className='button is-black pirate-btn submit' onClick={() => history.push('/shop')}>
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default withRouter(Success);

