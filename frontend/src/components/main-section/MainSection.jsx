import React from 'react';
import { withRouter } from 'react-router-dom';
import toyDuck from '../../assets/girl-with-red-hat-unsplash.jpg';
import './MainSection.styles.scss';

const MainSection = ({ history }) => {
    return (
        <div className='main-section-container'>
            <div className='main-section-middle'>
                <div className='ms-m-image'>
                   <img src={toyDuck} alt='toy duck' /> 
                </div>
                <div className='ms-m-description'>
                    <h2>Unique Nostalgia</h2>
                    <p>
                        We are a mother and daughter duo passionate about the past. Decorate your life with artifacts from the past... straight from our treasure hunts to your home!
                    </p>
                    <button className='button is-black' id='shop-now' onClicl={()=> history.push('/about')}>
                        About Us
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(MainSection);