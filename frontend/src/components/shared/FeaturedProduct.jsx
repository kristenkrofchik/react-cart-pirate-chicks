import React, { useContext } from 'react';
import { isInCart } from '../../Helpers';
import { CartContext } from '../../context/CartContext';
import { withRouter } from 'react-router-dom';
import './FeaturedProduct.styles.scss';

const FeaturedProduct = (props) => {
    const {name, image, price, history, id, description } = props;
    const product = { name, image, price, id, description };
    const { addProduct, increase, cartItems } = useContext(CartContext);
    const itemInCart = isInCart(product, cartItems);

    return (
        <div className='featured-product'>
            <div className='featured-image' onClick={()=> history.push(`/product/${id}`)}>
                <img src={image} alt={name} onerror="this.src='../../assets/no-image-icon.png'" />
            </div>
            <div className='name-price'>
                <h3>{name}</h3>
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