import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import Layout from '../shared/Layout';
import './SingleProduct.styles.scss';

const SingleProduct = ({ match, history: { push } }) => {
    const { products } = useContext(ProductsContext);
    const { id } = match.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const product = products.find(item => Number(item.id) === Number(id));

        if(!product) {
            return push('/shop');
        }

        setProduct(product);
    }, [products, product, id, push]);

    //while we wait for product
    if(!product) { return null };

    const { imageUrl, title, price, description } = product;

    return (
        <Layout>
            <div className='single-product-container'>
                <div className='product-image'>
                    <img src={imageUrl} alt='product' />
                </div>
                <div className='product-details'>
                    <div className='name-price'>
                        <h3>{title}</h3>
                        <p>$ {price}</p>
                    </div>
                    <div className='add-to-cart-buttons'>
                        <button className='button is-white pirate-btn' id='btn-white-outline'>
                            ADD TO CART
                        </button>
                        <button className='button is-black pirate-btn' id='btn-white-outline'>
                            CHECKOUT 
                        </button>
                    </div>
                    <div className='product-description'>
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(SingleProduct);