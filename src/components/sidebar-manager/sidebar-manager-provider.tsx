import React from 'react';

import { type SidebarContextProps } from '../ui/sidebar';

type SidebarRegistry = Record<string, SidebarContextProps>;

type SidebarManagerContextProps = {
    register: (name: string, context: SidebarContextProps) => void;
    unregister: (name: string) => void;
    use: (name: string) => SidebarContextProps | null;
};

const SidebarManagerContext = React.createContext<SidebarManagerContextProps | null>(null);

function useSidebarManager() {
    const context = React.useContext(SidebarManagerContext);
    if (!context) {
        throw new Error('useSidebarManager must be used within a SidebarManagerProvider.');
    }
    return context;
}

function SidebarManagerProvider({ children }: { children: React.ReactNode }) {
    const [sidebars, setSidebars] = React.useState<SidebarRegistry>({});

    const register = React.useCallback((name: string, context: SidebarContextProps) => {
        setSidebars((prev) => ({ ...prev, [name]: context }));
    }, []);

    const unregister = React.useCallback((name: string) => {
        setSidebars((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }, []);

    const value = React.useMemo(
        () => ({ register, unregister, use: (name: string) => sidebars[name] }),
        [register, unregister, sidebars]
    );

    return <SidebarManagerContext.Provider value={value}>{children}</SidebarManagerContext.Provider>;
}

export { SidebarManagerProvider, useSidebarManager };
