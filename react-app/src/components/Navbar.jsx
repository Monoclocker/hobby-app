import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Когда здесь использовал useNavigate компонент перерисовывался!!!
    const [openMenu, setOpenMenu] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [activeLink, setActiveLink] = useState(1);
    const menuRef = useRef(null);

    useEffect(() => {
        const savedStateActiveLink = JSON.parse(sessionStorage.getItem('activeLink'));
        setActiveLink(savedStateActiveLink);
    }, []);

    // Стили для активной и неактивной кнопки (ссылки) в navbar
    const classNameNavbar = {
        activeLinkDesktop: 'bg-gray-900 text-white rounded-md px-3 py-2 text-base font-medium',
        inactiveLinkDesktop:
            'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium',
        activeLinkMobile: 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium',
        inactiveLinkMobile:
            'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium',
    };

    const isMobileDevice = isMobile && (isAndroid || isIOS); // Определяю с какого устройства зашёл пользователь

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (openMenu) {
                let menu = !menuRef.current.contains(event.target); // Если нажали вне меню, то true

                if (event.target.id === 'icon-profile') menu = false;

                if (menu) setOpenMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, [openMenu]);

    return (
        <nav className="bg-indigo-800 shadow-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className={`relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 ${
                                !openMobileMenu ? '' : 'hover:bg-gray-700 hover:text-white'
                            }`}
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span
                                className="absolute -inset-0.5"
                                onClick={() => (isMobileDevice ? setOpenMobileMenu(!openMobileMenu) : '')}
                            ></span>
                            {!openMobileMenu ? (
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13V1m0 0L1 5m4-4 4 4"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to="/groups"
                                    className={
                                        activeLink === 1
                                            ? classNameNavbar.activeLinkDesktop
                                            : classNameNavbar.inactiveLinkDesktop
                                    }
                                    onClick={() => {
                                        setActiveLink(1);
                                        sessionStorage.setItem('activeLink', 1);
                                    }}
                                    aria-current="page"
                                >
                                    Группы
                                </Link>
                                <Link
                                    to="/messenger"
                                    className={
                                        activeLink === 2
                                            ? classNameNavbar.activeLinkDesktop
                                            : classNameNavbar.inactiveLinkDesktop
                                    }
                                    onClick={() => {
                                        setActiveLink(2);
                                        sessionStorage.setItem('activeLink', 2);
                                    }}
                                >
                                    Карта
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className={`${
                                        !isMobileDevice
                                            ? `transition-transform duration-100 ease-in-out transform ${
                                                  openMenu ? 'focus:-translate-y-1' : 'outline-none'
                                              } hover:-translate-y-1`
                                            : ''
                                    } relative flex rounded-full bg-gray-800 text-sm`}
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    {isMobileDevice ? (
                                        <Link
                                            to="/profile"
                                            id="icon-profile"
                                            onClick={() => {
                                                setActiveLink(0);
                                                sessionStorage.setItem('activeLink', 0);
                                            }}
                                            className="absolute -inset-1.5"
                                        ></Link>
                                    ) : (
                                        <span
                                            id="icon-profile"
                                            onClick={() => setOpenMenu(!openMenu)}
                                            className="absolute -inset-1.5"
                                        ></span>
                                    )}
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                            </div>

                            {openMenu && (
                                <div
                                    ref={menuRef}
                                    id="menu"
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                >
                                    <Link
                                        to="/profile"
                                        onClick={() => {
                                            setOpenMenu(!openMenu);
                                            setActiveLink(0);
                                            sessionStorage.setItem('activeLink', 0);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                    >
                                        Ваш профиль
                                    </Link>

                                    <Link
                                        to="#"
                                        onClick={() => {
                                            setOpenMenu(!openMenu);
                                            setActiveLink(0);
                                            sessionStorage.setItem('activeLink', 0);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-2"
                                    >
                                        Выход
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {openMobileMenu && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link
                            to="/groups"
                            className={
                                activeLink === 1 ? classNameNavbar.activeLinkMobile : classNameNavbar.inactiveLinkMobile
                            }
                            onClick={() => {
                                setActiveLink(1);
                                sessionStorage.setItem('activeLink', 1);
                            }}
                            aria-current="page"
                        >
                            Группы
                        </Link>
                        <Link
                            to="/messenger"
                            className={
                                activeLink === 2 ? classNameNavbar.activeLinkMobile : classNameNavbar.inactiveLinkMobile
                            }
                            onClick={() => {
                                setActiveLink(2);
                                sessionStorage.setItem('activeLink', 2);
                            }}
                        >
                            Карты
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
