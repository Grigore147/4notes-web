'use client';

import { LoginForm } from '@/features/auth/ui/login-form';
import { GalleryVerticalEnd } from 'lucide-react';

export function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4">
                <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                    <div className="flex w-full max-w-sm flex-col gap-6">
                        <a href="#" className="flex items-center gap-2 self-center font-medium">
                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            4Notes
                        </a>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
