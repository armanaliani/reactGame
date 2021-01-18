import React from "react";
import { Link } from "react-router-dom";
import image from './assets/boardGameHeader.svg';




const Header = () => {
    return (
        <header className="wrapper">
            <Link to="/" tabIndex="0">
                <img className="headerImg" src={image} alt="Logo, to Home page"/>
            </Link>
        </header>
    )
}

export default Header;