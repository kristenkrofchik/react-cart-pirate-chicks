import React from 'react';
import './hero.styles.scss';

const Hero = () => {
    return (
        <section className='hero is-info is-large'>
            <div className='hero-body'>
                <div className='container'>
                    <h1 className='title'>
                    Vintage & Antique Treasures for You and Yours
                    </h1>
                    <div className='shop-now-btn'>
                        <button className='button is-black' id='shop-now'>
                            SHOP NOW 
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;