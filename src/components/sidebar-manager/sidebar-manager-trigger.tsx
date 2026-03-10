import React from 'react';

import { cn } from '@/lib/utils';
import { PanelLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebarManager } from './sidebar-manager-provider';

function SidebarManagerTrigger({
    name,
    className,
    onClick,
    ...props
}: React.ComponentProps<typeof Button> & { name: string }) {
    const manager = useSidebarManager();
    const sidebar = manager.use(name);

    return (
        <Button
            data-sidebar="manager-trigger"
            data-slot="sidebar-manager-trigger"
            data-sidebar-name={name}
            variant="ghost"
            size="icon"
            className={cn('size-7', className)}
            onClick={(event) => {
                onClick?.(event);
                sidebar?.toggleSidebar();
            }}
            disabled={!sidebar}
            {...props}
        >
            <PanelLeftIcon />
            <span className="sr-only">Toggle {name} Sidebar</span>
        </Button>
    );
}

export { SidebarManagerTrigger };
