import { ReactNavbar } from 'overlay-navbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import logo from '../../../image/logo.png';

function Header() {
    return (
        <>
            <ReactNavbar
                logo={logo}
                bugerColor="red"
                burgerColorHover="#eb4034"
                navColor1="#ecf0f1"
                logoWidth="10vmax"
                logoHoverSize="10px"
                logoHoverColor="#eb4034"
                link1Text="Home"
                link2Text="Products"
                link3Text="Contact"
                link4Text="About"
                link1Url="/"
                link2Url="/products"
                link3Url="/contact"
                link4Url="/about"
                profileIconUrl="/login"
                link1Size="1.6vmax"
                link1Color="rgba(35,35,35,0.8)"
                nav1JustifyContent="flex-end"
                nav2JustifyContent="flex-end"
                nav3JustifyContent="flex-start"
                link1ColorHover="blue"
                link1Margin="4vmax"
                profileIconColor="rgba(35,35,35,.8)"
                searchIconColor="rgba(35,35,35,0.8)"
                cartIconColor="rgba(35,35,35,0.8)"
                profileIconColorHover="white"
                searchIconColorHover="white"
                cartIconColorHover="white"
                cartIconMargin="1vmax"
            />
            <ToastContainer />
        </>
    );
}

export default Header;
