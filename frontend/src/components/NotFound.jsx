import React from 'react';
import Layout from './shared/Layout';

const NotFound = () => {
    const style = {
        fontWeight: 'bold',
        textAlign: 'center',
    }

    return (
        <Layout>
            <p style={style}>We can't find the page you are looking for. Please try again.</p>
        </Layout>
    );
}

export default NotFound;