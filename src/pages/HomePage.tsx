import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';

import { ArchiveX, File, Inbox, Send, Trash2 } from 'lucide-react';

import { SidebarManager } from '@/components/sidebar-manager/sidebar-manager';
import { SidebarManagerProvider } from '@/components/sidebar-manager/sidebar-manager-provider';
import { SidebarManagerTrigger } from '@/components/sidebar-manager/sidebar-manager-trigger';

import { ScrollArea } from '@/components/ui/scroll-area';

import { AppSidebar } from '@/components/app-sidebar';

// This is sample data
const data = {
    navMain: [
        {
            title: 'Inbox',
            url: '#',
            icon: Inbox,
            isActive: true
        },
        {
            title: 'Drafts',
            url: '#',
            icon: File,
            isActive: false
        },
        {
            title: 'Sent',
            url: '#',
            icon: Send,
            isActive: false
        },
        {
            title: 'Junk',
            url: '#',
            icon: ArchiveX,
            isActive: false
        },
        {
            title: 'Trash',
            url: '#',
            icon: Trash2,
            isActive: false
        }
    ],
    mails: [
        {
            name: 'William Smith',
            email: 'williamsmith@example.com',
            subject: 'Meeting Tomorrow',
            date: '09:34 AM',
            teaser: 'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.'
        },
        {
            name: 'Alice Smith',
            email: 'alicesmith@example.com',
            subject: 'Re: Project Update',
            date: 'Yesterday',
            teaser: "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps."
        },
        {
            name: 'Bob Johnson',
            email: 'bobjohnson@example.com',
            subject: 'Weekend Plans',
            date: '2 days ago',
            teaser: "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?"
        },
        {
            name: 'Emily Davis',
            email: 'emilydavis@example.com',
            subject: 'Re: Question about Budget',
            date: '2 days ago',
            teaser: "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?"
        },
        {
            name: 'Michael Wilson',
            email: 'michaelwilson@example.com',
            subject: 'Important Announcement',
            date: '1 week ago',
            teaser: "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future."
        },
        {
            name: 'Sarah Brown',
            email: 'sarahbrown@example.com',
            subject: 'Re: Feedback on Proposal',
            date: '1 week ago',
            teaser: "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?"
        },
        {
            name: 'David Lee',
            email: 'davidlee@example.com',
            subject: 'New Project Idea',
            date: '1 week ago',
            teaser: "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?"
        },
        {
            name: 'Olivia Wilson',
            email: 'oliviawilson@example.com',
            subject: 'Vacation Plans',
            date: '1 week ago',
            teaser: "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave."
        },
        {
            name: 'James Martin',
            email: 'jamesmartin@example.com',
            subject: 'Re: Conference Registration',
            date: '1 week ago',
            teaser: "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end."
        },
        {
            name: 'Sophia White',
            email: 'sophiawhite@example.com',
            subject: 'Team Dinner',
            date: '1 week ago',
            teaser: "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences."
        }
    ]
};

export default function HomePage() {
    return (
        <SidebarManagerProvider>
            <SidebarProvider>
                <AppSidebar />

                <SidebarInset>
                    <SidebarProvider style={{ '--sidebar-width': '20rem' } as React.CSSProperties}>
                        <SidebarManager name="second">
                            <Sidebar
                                side="left"
                                style={
                                    {
                                        position: 'absolute',
                                        /** This is required to avoid this sidebar sliding on top of the first one when collapsed */
                                        zIndex: '10'
                                    } as React.CSSProperties
                                }
                            >
                                <SidebarHeader className="gap-3.5 border-b p-4">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="text-foreground text-base font-medium">Notes</div>
                                        <Label className="flex items-center gap-2 text-sm">
                                            <span>Favorites</span>
                                            <Switch className="shadow-none" />
                                        </Label>
                                    </div>
                                    <SidebarInput placeholder="Type to search..." />
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarGroup className="px-0">
                                        <SidebarGroupContent>
                                            {data.mails.map((mail) => (
                                                <a
                                                    href="#"
                                                    key={mail.email}
                                                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                                                >
                                                    <div className="flex w-full items-center gap-2">
                                                        <span>{mail.name}</span>{' '}
                                                        <span className="ml-auto text-xs">{mail.date}</span>
                                                    </div>
                                                    <span className="font-medium">{mail.subject}</span>
                                                    <span className="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                                                        {mail.teaser}
                                                    </span>
                                                </a>
                                            ))}
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                </SidebarContent>
                            </Sidebar>
                        </SidebarManager>

                        <SidebarInset>
                            <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
                                <SidebarManagerTrigger name="app-sidebar" />
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Inbox</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </header>
                            <ScrollArea className="h-screen">
                                <div className="flex flex-1 flex-col gap-4 p-4">
                                    {Array.from({ length: 24 }).map((_, index) => (
                                        <div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
                                    ))}
                                </div>
                            </ScrollArea>
                        </SidebarInset>
                    </SidebarProvider>
                </SidebarInset>
            </SidebarProvider>
        </SidebarManagerProvider>
    );
}
