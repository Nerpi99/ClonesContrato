import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = () => {
    return (
        <>
            <div class="fondo-falopa">            
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout