import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="wrapper">
            <Link to="/" tabIndex="0">
                <p>Home</p>
            </Link>
        </header>
    )
}

export default Header;