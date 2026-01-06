'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callback = searchParams.get('callback') || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password');
                setLoading(false);
            } else {
                router.push(callback);
                setTimeout(() => router.refresh(), 100);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-block mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-primary">Welcome Back</h1>
                    <p className="text-muted-foreground mt-2 font-light">Sign in to your collector account</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border/50">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm font-medium">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-muted/30 border-none rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="admin@cherif.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-muted/30 border-none rounded-xl pl-12 pr-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                        New to the gallery? {' '}
                        <Link href="/auth/signup" className="text-primary font-bold hover:underline">Create an Account</Link>
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-4 border-t border-border/50">
                        Secure Authentication System
                    </p>
                </div>
            </div>
        </div>
    );
}
