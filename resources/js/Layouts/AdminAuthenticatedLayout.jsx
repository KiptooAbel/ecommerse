import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import {
    Menu,X,LayoutGrid, Users, Package, ShoppingCart, BarChart3,
    Settings, Tags, Truck, MessageSquare, Bell,
    ChevronLeft, ChevronRight
  } from 'lucide-react';

const SidebarLink = ({ href, icon: Icon, active, children }) => (
    <Link
        href={href}
        className={`
            flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium
            transition-all duration-300 ease-in-out group
            hover:scale-102 transform
            ${active 
                ? 'bg-white/20 text-white' 
                : 'text-blue-50 hover:bg-white/10 hover:text-white'
            }
        `}
    >
        <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-blue-100 group-hover:text-white'}`} />
        <span className="font-medium">{children}</span>
        {active && (
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
        )}
    </Link>
);

function AdminAuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { name: 'Dashboard', href: route('dashboard'), icon: LayoutGrid },
    { name: 'Orders', href: route('dashboard'), icon: ShoppingCart },
    { name: 'Products', href: route('books.index'), icon: Package },
    { name: 'Customers', href: route('dashboard'), icon: Users },
    { name: 'Categories', href: route('dashboard'), icon: Tags },
    { name: 'Analytics', href: route('dashboard'), icon: BarChart3 },
    { name: 'Shipping', href: route('dashboard'), icon: Truck },
    { name: 'Customer Support', href: route('dashboard'), icon: MessageSquare},
  ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm">
                <div className="px-4 mx-auto max-w-[2000px]">
                    <div className="flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                        >
                            {isSidebarOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>

                        {/* Logo */}
                        <div className="flex lg:flex-1 items-center space-x-2">
                        </div>
                        {/* Right side items */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                                <Bell className="h-5 w-5" />
                            </button>

                            <Dropdown>
              <Dropdown.Trigger>
                <button className="flex items-center gap-3 rounded-lg hover:bg-gray-50 px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-700">{user.name}</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Link href={route('adminprofile.edit')}>Profile</Dropdown.Link>
                <Dropdown.Link href={route('logout')} method="post" as="button">
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={`
                fixed top-16 bottom-0 left-0 z-40
                w-64 bg-gradient-to-b from-blue-700 to-blue-800 shadow-lg
                transition-all duration-300 ease-in-out
                lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
                        {/* Welcome Section */}

                        {/* Navigation */}
                        <nav className="space-y-1">
                            {navigationItems.map((item) => (
                                <SidebarLink
                                    key={item.name}
                                    href={item.href}
                                    icon={item.icon}
                                    active={route().current(item.href.split('.').pop())}
                                >
                                    {item.name}
                                </SidebarLink>
                            ))}
                        </nav>
                    </div>

                    {/* Sidebar footer */}
                    <div className="border-t border-blue-600/30 p-4">
                        <div className="flex items-center justify-between text-sm">
        
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm lg:hidden z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:pl-64 pt-16 min-h-screen">
                {header && (
                    <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-blue-100">
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

export default AdminAuthenticatedLayout;
