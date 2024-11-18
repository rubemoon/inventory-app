import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import DashboardLinks from '../components/DashboardLinks';
import ThemeToggle from '../components/ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { Toaster } from '../components/ui/sonner';
import { useAuth } from '../context/AuthContext';

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden md:block border-r bg-muted/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="Inventory Logo" width={100} height={100} />
                        </Link>
                    </div>

                    <div className="flex-1">
                        <nav className="grid items-start px-2 lg:px-4">
                            <DashboardLinks />
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Button className="md:hidden shrink-0" size="icon" variant="outline">
                        <Menu className="size-5" />
                    </Button>

                    <div className="ml-auto flex items-center gap-x-4">
                        <ThemeToggle />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <img
                                        src={user?.image || '/default-profile.png'}
                                        alt="Profile Image"
                                        width={20}
                                        height={20}
                                        className="w-full h-full rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <button onClick={logout} className="w-full text-left">Log out</button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
            <Toaster richColors closeButton />
        </div>
    );
};

export default DashboardLayout;