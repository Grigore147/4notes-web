'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { logout } from '@/features/auth/auth.service';
import { Link } from '@tanstack/react-router';

export default function NotesPage() {
    // const Notes = new NotesService(notesApi);

    // const initNotes = async () => {
    //     const notes = await Notes.find({ limit: 1 });

    //     console.log(notes);
    // };

    // initNotes();

    const notes = [
        {
            id: 'note-id-123',
            userId: 'user-id-1',
            title: 'Note title 1',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },
        {
            id: 'note-id-124',
            userId: 'user-id-1',
            title: 'Note title 2',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        }
    ];

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
                                <button type="button" onClick={() => logout()} className={navigationMenuTriggerStyle()}>
                                    Logout
                                </button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <Table>
                <TableCaption>Notes</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Note ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Created At</TableHead>
                        <TableHead className="text-right">Updated At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {notes.map((note) => (
                        <TableRow key={note.id}>
                            <TableCell className="font-medium">{note.id}</TableCell>
                            <TableCell>{note.userId}</TableCell>
                            <TableCell>{note.title}</TableCell>
                            <TableCell className="text-right">{note.createdAt}</TableCell>
                            <TableCell className="text-right">{note.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}
