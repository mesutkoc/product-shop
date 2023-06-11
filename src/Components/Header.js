import React from "react";
import { useNavigate } from 'react-router-dom';
import './table.scss'

function Header() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/dashboard');

    return (
        <header className="header">
            <div className="logo" onClick={() => handleClick()}>
                <div className="title">Shoping</div>
            </div>
        </header>
    )
}

export default Header;