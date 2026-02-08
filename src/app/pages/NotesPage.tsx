'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { logout } from '@/services/auth/auth.service';
import { Link } from '@tanstack/react-router';

export function NotesPage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link
                                    to="/"
                                    activeOptions={{ exact: true }}
                                    className="data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
                                >
                                    Home
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link
                                    to="/notes"
                                    className="data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
                                >
                                    Notes
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <button type="button" onClick={logout} className={navigationMenuTriggerStyle()}>
                                    Logout
                                </button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </main>
    );
}
