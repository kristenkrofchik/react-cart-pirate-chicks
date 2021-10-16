import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../cart-icon/CartIcon';
import './Header.styles.scss';

const Header = () => {
    return (
        <nav className='nav-menu container'>
            <div className='logo'>
                <Link to='/'>PIRATE CHICKS VINTAGE</Link>
            </div>
            <ul>
                <li>
                    <Link to='/'>
                        Home
                    </Link> 
                </li>
                <li>
                    <Link to='/shop'>
                        Shop
                    </Link> 
                </li>
                <li>
                    <Link to='/about'>
                        About
                    </Link> 
                </li>
            </ul>
            <CartIcon />
        </nav>
    );
}

export default Header;
