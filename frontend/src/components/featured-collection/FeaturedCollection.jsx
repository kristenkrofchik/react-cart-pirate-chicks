import React, { useState, useEffect } from 'react';
import FeaturedProduct from '../shared/FeaturedProduct';
import LoadingSpinnerHome from '../shared/LoadingSpinnerHome';
import PirateApi from '../../Api';

const FeaturedCollection = () => {

    const [products, setProducts] = useState(null);

    useEffect(function getProductsOnMount() {
        search();
    }, []);
    
    async function search(name) {
        let products = await PirateApi.getProducts(name);
        setProducts(products);
      }

    if (!products) return <LoadingSpinnerHome />;

    const productItems = products.filter((product, i) => i < 4).map(product => (
        <FeaturedProduct {...product} key={product.id} />
    ));

    return (
        <div className='featured-collection container'>
            <h2 className='featured-section-title'>
                Featured Items
            </h2>
            <div className='products'>
                {
                    productItems
                }
            </div>
        </div>
    )
}

export default FeaturedCollection;
