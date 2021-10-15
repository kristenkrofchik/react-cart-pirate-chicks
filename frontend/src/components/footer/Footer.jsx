import React from 'react';
import './Footer.styles.scss';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='footer'>
            {year} © Pirate Chicks Vintage
        </div>
    );
}

export default Footer;