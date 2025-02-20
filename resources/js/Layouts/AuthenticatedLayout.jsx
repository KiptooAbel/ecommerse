import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import {
    Menu, X, Home, BookOpen, Bookmark, ShoppingCart, Heart,
    User, Clock, Star, MessageSquare, Bell, Search,
    ChevronLeft, ChevronRight, Shield
} from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, active, children, badge }) => (
    <Link
        href={href}
        className={`
            flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium
            transition-all duration-300 ease-in-out group
            hover:scale-102 transform
            ${active 
                ? 'bg-white/20 text-white' 
                : 'text-indigo-50 hover:bg-white/10 hover:text-white'
            }
        `}
    >
        <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-indigo-100 group-hover:text-white'}`} />
        <span className="font-medium">{children}</span>
        {badge && (
            <div className="ml-auto px-2 py-0.5 rounded-full bg-indigo-400 text-white text-xs font-semibold">
                {badge}
            </div>
        )}
        {active && !badge && (
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
        )}
    </Link>
);

function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigationItems = [
        { name: 'Home', href: route('dashboard'), icon: Home },
        { name: 'Browse Books', href: route('dashboard'), icon: BookOpen },
        { name: 'My Library', href: route('dashboard'), icon: Bookmark },
        { name: 'Wishlist', href: route('dashboard'), icon: Heart},
        { name: 'Cart', href: route('dashboard'), icon: ShoppingCart},
        { name: 'Reading History', href: route('dashboard'), icon: Clock },
        { name: 'Reviews & Ratings', href: route('dashboard'), icon: Star },
        { name: 'Recommendations', href: route('dashboard'), icon: Shield },
        { name: 'Book Clubs', href: route('dashboard'), icon: MessageSquare},
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-indigo-100 shadow-sm">
                <div className="px-4 mx-auto max-w-[2000px]">
                    <div className="flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
                            >
                                {isSidebarOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>

                        {/* Empty div to push right items to the right */}
                        <div className="flex-1"></div>

                        {/* Right side items */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-indigo-500"></span>
                            </button>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 rounded-lg hover:bg-gray-50 px-3 py-2">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-sm font-medium text-indigo-600">
                                                {user ? user.name.charAt(0) : 'G'}
                                            </span>
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <div className="text-sm font-medium text-gray-700">{user ? user.name : 'Guest'}</div>
                                            <div className="text-xs text-gray-500">{user ? 'Member' : 'Sign in'}</div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
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

            {/* Sidebar */}
            <aside className={`
                fixed top-16 bottom-0 left-0 z-40
                w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-lg
                transition-all duration-300 ease-in-out
                lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto px-3 py-6 space-y-2">


                        {/* Navigation */}
                        <nav className="space-y-1">
                            {navigationItems.map((item) => (
                                <SidebarLink
                                    key={item.name}
                                    href={item.href}
                                    icon={item.icon}
                                    active={route().current(item.href.split('.').pop())}
                                    badge={item.badge}
                                >
                                    {item.name}
                                </SidebarLink>
                            ))}
                        </nav>
                    </div>


                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-indigo-900/20 backdrop-blur-sm lg:hidden z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:pl-64 pt-16 min-h-screen">
                {header && (
                    <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-indigo-100">
                        <div className="px-6 py-6">
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