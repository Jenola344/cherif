'use client';

import { useState } from 'react';
import { signupAction } from './actions';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function SignupPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await signupAction(formData);

        if (result.success) {
            setStatus('success');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else {
            setStatus('error');
            setError(result.error || 'Failed to sign up');
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-block mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-primary">Join the Gallery</h1>
                    <p className="text-muted-foreground mt-2 font-light">Create an account to curate your collection</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border/50">
                    {status === 'success' ? (
                        <div className="text-center py-10 space-y-6">
                            <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary">Account Created</h3>
                            <p className="text-muted-foreground">Redirecting you to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm font-medium">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        className="w-full bg-muted/30 border-none rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        required
                                        name="email"
                                        type="email"
                                        className="w-full bg-muted/30 border-none rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        required
                                        name="password"
                                        type="password"
                                        className="w-full bg-muted/30 border-none rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Min. 8 characters"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={status === 'loading'}
                                type="submit"
                                className="w-full bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Creating Account...' : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? {' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
