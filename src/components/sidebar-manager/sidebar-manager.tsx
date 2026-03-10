import React from 'react';

import { useSidebar } from '../ui/sidebar';
import { useSidebarManager } from './sidebar-manager-provider';

function SidebarManager({ children, name }: { children: React.ReactNode; name: string }) {
    const sidebarContext = useSidebar();
    const manager = useSidebarManager();

    // Use refs to avoid infinite loops - we don't want changes to these
    // objects to trigger re-registration, only changes to `name` should.
    const sidebarContextRef = React.useRef(sidebarContext);
    const managerRef = React.useRef(manager);

    // Keep refs up to date
    React.useLayoutEffect(() => {
        sidebarContextRef.current = sidebarContext;
        managerRef.current = manager;
    });

    // Register on mount / when name changes, unregister on unmount
    React.useEffect(() => {
        managerRef.current.register(name, sidebarContextRef.current);
        return () => managerRef.current.unregister(name);
    }, [name]);

    // Keep the registry updated when sidebarContext changes (without causing loops)
    React.useEffect(() => {
        managerRef.current.register(name, sidebarContext);
    }, [name, sidebarContext]);

    return <>{children}</>;
}

export { SidebarManager };
