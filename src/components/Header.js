import React from 'react';
import './Header.css'
const Header = () => {
    let imgurl='../../img/clippers_logo.png'
    return(
        <div id='header'>
            <div className='row' id='row'>
           {/* <img className='img-fluid' src={imgurl} alt='Clippers Logo' id='logo'/> */}
            <h1 id='Masthead'>Clippers Suite Order Form</h1>
            </div>
        </div>
    )
}

export default Header;