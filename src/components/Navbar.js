import React from 'react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';


function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const { isAuth, setIsAuth } = useAuth();
    
   
    let navigate = useNavigate();
    //const name = user.displayName[0];

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            navigate("/SignUp");
        })
    };

    return (
        <nav className="w-full bg-white shadow-lg">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to="/">
                            <h2 className="text-2xl font-extrabold text-gray-dark hover:text-gray-light">Personally&#8482;</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? 
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                 : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-400 hover:text-gray-light">
                                <Link to="/">Daily Digest</Link>
                            </li>
                            <li className="text-gray-400 hover:text-gray-light">
                                <Link to="/">Design</Link>
                            </li>
                            <li className="text-gray-400 hover:text-gray-light">
                                <Link to="/">Tutorials</Link>
                            </li>
                            { !isAuth ? <Link to="SignUp"> 
                                <div className="block lg:px-10 lg:py-2 my-5 md:px-8 sm:my-3 ">
                                   <button className='bg-gray-dark text-white py-2 px-4 rounded-md hover:bg-gray-light '>Sign Up</button>
                                </div>
                            </Link> : 
                            <>
                               <div className="hover:text-gray-light">
                                    <Link to="/Post">Create Post</Link>
                               </div>
                               <div className="relative">
                                    <img className ="object-cover w-14 h-14 rounded-full"
                                        src="https://images.unsplash.com/photo-1520315342629-6ea920342047?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGNhdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                                        alt="J"  />
                                    <span className="absolute lg:right-0  sm:left-0 md:right-0 w-4 h-4  bg-green border-2 border-white rounded-full top-1 bottom-0 mb-1 md:mb-0"></span>
                                </div>
                                <div className="block lg:px-10 lg:py-2 my-3 md:px-8 sm:my-3">
                                    <button className='bg bg-red-dark text-white py-2 px-4 rounded-md hover:bg-gray-light' onClick={signUserOut}>Log Out</button>
                                </div>
                            </>
                            }
                            <Outlet/>
                        </ul>
                        <Outlet/>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;