import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import {
    Menu, X, Home, BookOpen, Bookmark, ShoppingCart, Heart,
    User, Clock, Star, MessageSquare, Shield, Search
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, active, children, badge }) => (
    <Link
        href={href}
        className={`
            flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium
            transition-all duration-300 ease-in-out group
            hover:bg-indigo-500/20 hover:translate-x-1
            ${active 
                ? 'bg-gradient-to-r from-indigo-600/40 to-indigo-500/20 text-white' 
                : 'text-indigo-100 hover:text-white'
            }
        `}
    >
        <Icon className={`h-5 w-5 ${active ? 'text-teal-300' : 'text-indigo-200 group-hover:text-teal-300'}`} />
        <span className="font-medium">{children}</span>
        {badge && (
            <div className="ml-auto px-2 py-0.5 rounded-full bg-teal-400 text-indigo-900 text-xs font-semibold">
                {badge}
            </div>
        )}
        {active && !badge && (
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-300" />
        )}
    </Link>
);

function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navigationItems = [
        { name: 'Home', href: route('dashboard'), icon: Home },
        { name: 'Browse Books', href: route('dashboard'), icon: BookOpen },
        { name: 'My Library', href: route('dashboard'), icon: Bookmark },
        { name: 'Reading History', href: route('dashboard'), icon: Clock },
        { name: 'Reviews & Ratings', href: route('dashboard'), icon: Star },
        { name: 'Recommendations', href: route('dashboard'), icon: Shield },
        { name: 'Book Clubs', href: route('dashboard'), icon: MessageSquare},
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50/30">
            {/* Top Navigation Bar - Fixed Height */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-lg h-16">
                <div className="px-4 mx-auto max-w-[2000px] h-full">
                    <div className="flex h-full items-center justify-between">
                        {/* Left side with logo and mobile menu button */}
                        <div className="flex items-center space-x-4">
                            {/* Menu button only on small screens */}
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-white hover:bg-indigo-700 focus:outline-none transition-colors duration-200"
                            >
                                {isSidebarOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                            
                            {/* Store name */}
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold text-teal-300">TaleStore</h1>
                                <p className="hidden md:block ml-2 text-sm italic text-indigo-200">Hadithi Zinazoishi Daima</p>
                            </div>
                        </div>

                        {/* Search Bar - Compact Version */}
                        <div className="hidden md:flex flex-1 mx-4 max-w-md relative">
                            <input 
                                type="text" 
                                placeholder="Tafuta vitabu, waandishi, genre..." 
                                className="w-full py-1.5 px-4 rounded-full text-gray-800 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none border border-indigo-200"
                            />
                            <div className="absolute right-3 top-1.5 h-5 w-5 text-indigo-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Search icon for small screens */}
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 text-white hover:text-teal-300 focus:outline-none transition-colors duration-200"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Right side items */}
                        <div className="flex items-center gap-2">
                            {/* Wishlist and Cart with icons only on small screens, text on larger */}
                            <div className="flex items-center space-x-3">
                                <a href="/wishlist" className="flex items-center p-1.5 hover:text-teal-300 transition-colors duration-200">
                                    <Heart className="h-5 w-5" />
                                    <span className="hidden sm:inline text-xs ml-1">Wishlist</span>
                                </a>
                                <a href="/cart" className="flex items-center p-1.5 hover:text-teal-300 transition-colors duration-200">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="hidden sm:inline text-xs ml-1">Cart</span>
                                </a>
                            </div>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 rounded-lg hover:bg-indigo-700 px-2 py-1.5 transition-colors duration-200">
                                        <div className="h-7 w-7 rounded-full bg-teal-100 flex items-center justify-center">
                                            <span className="text-sm font-medium text-indigo-700">
                                                {user ? user.name.charAt(0) : 'G'}
                                            </span>
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <div className="text-xs font-medium text-white">{user ? user.name : 'Guest'}</div>
                                            <div className="text-xs text-indigo-200">{user ? 'Member' : 'Sign in'}</div>
                                        </div>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {user ? (
                                        <>
                                            <Dropdown.Link href={route('profile.edit')}>My Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('dashboard')}>My Orders</Dropdown.Link>
                                            <Dropdown.Link href={route('dashboard')}>Account Settings</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </>
                                    ) : (
                                        <>
                                            <Dropdown.Link href={route('login')}>Log In</Dropdown.Link>
                                            <Dropdown.Link href={route('register')}>Create Account</Dropdown.Link>
                                        </>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile search bar - conditionally shown */}
            {isSearchOpen && (
                <div className="fixed top-16 left-0 right-0 z-40 bg-indigo-800 px-4 py-2 md:hidden shadow-md">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Tafuta vitabu..." 
                            className="w-full py-2 px-4 rounded-full text-gray-800 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none border border-indigo-200"
                            autoFocus
                        />
                        <div className="absolute right-3 top-2 h-5 w-5 text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar - Redesigned */}
{/* Sidebar - E-commerce Focused */}
<aside className={`
    fixed top-0 pt-16 bottom-0 left-0 z-40
    w-64 bg-gradient-to-b from-indigo-800 via-indigo-900 to-indigo-950 shadow-xl
    transform transition-all duration-300 ease-in-out
    lg:translate-x-0
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    overflow-hidden
`}>
    <div className="flex flex-col h-full">
        {/* Quick stats section */}
        <div className="px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-indigo-700/20 rounded-lg p-2 text-center">
                    <p className="text-xs text-indigo-200">My Books</p>
                    <p className="text-lg font-bold text-teal-300">{user ? '12' : '0'}</p>
                </div>
                <div className="bg-indigo-700/20 rounded-lg p-2 text-center">
                    <p className="text-xs text-indigo-200">Credits</p>
                    <p className="text-lg font-bold text-teal-300">{user ? '250' : '0'}</p>
                </div>
            </div>
        </div>
        
        <div className="relative flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {/* Shop section */}
            <div className="px-4 mb-1">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-indigo-300">Shop</h3>
            </div>
            
            <nav className="space-y-0.5">
                <SidebarLink href={route('dashboard')} icon={Home} active={route().current('dashboard')} badge={user ? '3' : null}>
                    Today's Deals
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={BookOpen} active={false}>
                    Browse Categories
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={Shield} active={false}>
                    New Releases
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={Star} active={false}>
                    Bestsellers
                </SidebarLink>
            </nav>
            
            {/* Your Account section */}
            <div className="px-4 mt-6 mb-1">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-indigo-300">Your Account</h3>
            </div>
            
            <nav className="space-y-0.5">
                <SidebarLink href={route('dashboard')} icon={Bookmark} active={false}>
                    My Library
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={Heart} active={false} badge={user ? '2' : null}>
                    Wishlist
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={ShoppingCart} active={false}>
                    Cart
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={Clock} active={false}>
                    Reading History
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={MessageSquare} active={false}>
                    Book Clubs
                </SidebarLink>
            </nav>
            
            {/* Support section */}
            <div className="px-4 mt-6 mb-1">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-indigo-300">Support</h3>
            </div>
            
            <nav className="space-y-0.5">
                <SidebarLink href={route('dashboard')} icon={User} active={false}>
                    Help Center
                </SidebarLink>
                <SidebarLink href={route('dashboard')} icon={MessageSquare} active={false}>
                    Contact Us
                </SidebarLink>
            </nav>
        </div>
        
        {/* Promotional card */}
        <div className="relative px-4 py-4 mt-auto">
            <div className="mx-1 p-3 rounded-xl bg-gradient-to-r from-indigo-600/30 to-indigo-700/20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-indigo-900">
                            <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3z" />
                            <path d="M11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs text-white font-medium">50% off your first book</p>
                        <p className="text-xs text-indigo-200">Use code: TALE50</p>
                    </div>
                </div>
            </div>
            <p className="text-xs text-indigo-400 text-center mt-4">© 2025 TaleStore. All rights reserved.</p>
        </div>
    </div>
</aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-indigo-900/30 backdrop-blur-sm lg:hidden z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:pl-64 pt-16 min-h-screen">
                {header && (
                    <header className="bg-white shadow-sm border-b border-indigo-100">
                        <div className="px-6 py-4">
                            {header}
                        </div>
                    </header>
                )}

                <main className="p-6 max-w-[2000px] mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AuthenticatedLayout;