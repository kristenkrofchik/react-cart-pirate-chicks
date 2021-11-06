import React, { useContext, useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { isInCart } from '../../Helpers';
import Layout from '../shared/Layout';
import PirateApi from '../../Api';
import './SingleProduct.styles.scss';
import LoadingSpinner from '../shared/LoadingSpinner';

const SingleProduct = ({ history }) => {
    const { addProduct, increase, cartItems } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function getProduct() {
            setProduct(await PirateApi.getProduct(id))
        }
        getProduct();
    }, [id]);


    //while we wait for product
    if(!product) return <LoadingSpinner />;

    const { name, price, description, quantity } = product;
    const itemInCart = isInCart(product, cartItems);

    return (
        <Layout>
            <div className='single-product-container'>
                <div className='product-image'>
                    <img src={`${process.env.PUBLIC_URL}/images/${id}.jpg`} alt={name} />
                </div>
                <div className='product-details'>
                    <div className='name-price'>
                        <h3>{name}</h3>
                        <p>$ {price}</p>
                    </div>
                    <div className='add-to-cart-buttons'>
                        {
                            !itemInCart &&
                            <button 
                                className='button is-white pirate-btn' id='btn-white-outline' onClick={() => addProduct(product)}>
                                ADD TO CART
                            </button>
                        }
                        {
                            itemInCart && quantity > 1 &&
                            <button 
                                className='button is-white pirate-btn' id='btn-white-outline' onClick={() => increase(product)}>
                                ADD MORE
                            </button>
                        }
                        {
                            quantity < 1 &&
                            <button
                                className='button is-white pirate-btn' id='btn-white-outline'>
                                SOLD OUT
                            </button>
                        }
                        <button className='button is-black pirate-btn' id='btn-white-outline' onClick={() => history.push('/cart')}>
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