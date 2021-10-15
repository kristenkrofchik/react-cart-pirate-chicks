import React, { useContext } from 'react';
import { isInCart } from '../../Helpers';
import { CartContext } from '../../context/CartContext';
import { withRouter } from 'react-router-dom';
import './FeaturedProduct.styles.scss';

const FeaturedProduct = (props) => {
    const {title, imageUrl, price, history, id, description } = props;
    const product = { title, imageUrl, price, id, description };
    const { addProduct, increase, cartItems } = useContext(CartContext);
    const itemInCart = isInCart(product, cartItems);


    return (
        <div className='featured-product'>
            <div className='featured-image' onClick={() => history.push(`/product/${id}`)}>
                <img src={imageUrl} alt='product' />
            </div>
            <div className='name-price'>
                <h3>{title}</h3>
                <p>$ {price}</p>
                { 
                    !itemInCart &&
                    <button className='button is-black pirate-btn' onClick={() => addProduct(product)}>ADD TO CART</button>
                }
                {
                    itemInCart &&
                    <button className='button is-white pirate-btn' id='btn-white-outline' onClick={() => increase(product)}>ADD MORE</button>
                }
            </div>
        </div>
    )
}

export default withRouter(FeaturedProduct);