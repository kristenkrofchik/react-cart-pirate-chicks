import React, { useContext, useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
//import { ProductsContext } from '../../context/ProductsContext';
import { CartContext } from '../../context/CartContext';
import { isInCart } from '../../Helpers';
import Layout from '../shared/Layout';
import PirateApi from '../../Api';
import './SingleProduct.styles.scss';

const SingleProduct = ({ history: { push } }) => {
    //const { products } = useContext(ProductsContext);
    const { addProduct, increase, cartItems } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function getProduct() {
            setProduct(await PirateApi.getProduct(id))
        }
        getProduct();
        
        if(!product) {
            return push('/shop');
        }
    }, [id, product, push]);

    //while we wait for product
    if(!product) { return null };

    const { image, name, price, description } = product;
    const itemInCart = isInCart(product, cartItems);

    return (
        <Layout>
            <div className='single-product-container'>
                <div className='product-image'>
                    <img src={image} alt={name} />
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
                            itemInCart &&
                            <button 
                                className='button is-white pirate-btn' id='btn-white-outline' onClick={() => increase(product)}>
                                ADD MORE
                            </button>
                        }
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