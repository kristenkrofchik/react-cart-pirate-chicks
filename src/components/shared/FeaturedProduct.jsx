import React from 'react';
import { withRouter } from 'react-router-dom';
import './FeaturedProduct.styles.scss';

const FeaturedProduct = (props) => {
    const {title, imageUrl, price, history, id } = props;

    return (
        <div className='featured-product'>
            <div className='featured-image' onClick={() => history.push(`/product/${id}`)}>
                <img src={imageUrl} alt='product' />
            </div>
            <div className='name-price'>
                <h3>{title}</h3>
                <p>$ {price}</p>
                <button className='button is-black pirate-btn'>ADD TO CART</button>
            </div>
        </div>
    )
}

export default withRouter(FeaturedProduct);