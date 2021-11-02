import React from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../shared/Layout';

const Cancelled = ({ history }) => {
    return (
        <Layout>
            <div className='checkout'>
                <h1>Payment Not Completed</h1>
                <p>The checkout was unsuccessful. Please check your information and try again. Thank you!</p>
                <div>
                    <button className='button is-black pirate-btn submit' onClick={() => history.push('/shop')}>
                        Back to Shop
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Cancelled);