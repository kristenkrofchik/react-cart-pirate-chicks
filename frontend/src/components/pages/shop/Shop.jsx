import React, { useState, useEffect } from 'react';
import Layout from '../../shared/Layout';
import FeaturedProduct from '../../shared/FeaturedProduct';
import LoadingSpinner from '../../shared/LoadingSpinner';
import PirateApi from '../../../Api';
//import { ProductsContext } from '../../../context/ProductsContext';
import './Shop.styles.scss';

const Shop = () => {

    const [products, setProducts] = useState(null);

    useEffect(function getProductsOnMount() {
        search();
    }, []);
    
    async function search(name) {
        let products = await PirateApi.getProducts(name);
        setProducts(products);
      }

    if (!products) return <LoadingSpinner />;

    const allProducts = products.map(product => (
        <FeaturedProduct {...product} key={product.id} />
    ));

    return (
        <Layout>
            <div className='product-list-container'>
                <h2 className='product-list-title'>Shop</h2>
                <div className='product-list'>
                    {
                        allProducts
                    }
                </div>
            </div>
        </Layout>
    );
}

export default Shop;