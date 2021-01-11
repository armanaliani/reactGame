import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header>
            <p>
                <Link to="/" tabIndex="0">
                    Home
                </Link>
            </p>
        </header>
    )
}

export default Header;