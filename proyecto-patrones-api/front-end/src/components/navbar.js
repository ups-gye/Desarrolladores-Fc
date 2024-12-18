import React from 'react';
import { Link, } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = ({ toggleSidebar }) => {
    const { user } = useAuth();



    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <button
                    className="text-white md:hidden"
                    onClick={toggleSidebar}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-4 6h12"></path>
                    </svg>
                </button>

                <Link to="/" className="text-white text-lg font-bold">
                    Hotel
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4 items-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.121 17.804A9.953 9.953 0 0112 15c2.21 0 4.21.722 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                    </svg>
                    <p className='text-white'>{`${user.nombre} ${user.apellido}`}</p>
                </div>
            </div>

            {/* Mobile Menu */}
            {/* {isMobileMenuOpen && ( */}
            {/* <div className="md:hidden mt-2 space-y-2">
                    <Link to="/admin" className="block text-gray-300 hover:text-white">Admin</Link>
                    <Link to="/user" className="block text-gray-300 hover:text-white">User</Link>
                    <div className="block text-gray-300 hover:text-white">
                        {user ? user.name : 'Guest'}
                    </div>
                    <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left text-gray-300 hover:text-white"
                    >
                        Logout
                    </button>
                </div> */}
            {/* )} */}
        </nav>
    );
};

export default Navbar;
