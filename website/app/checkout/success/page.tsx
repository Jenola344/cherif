import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ ref: string; mock?: string }>;
}) {
    const ref = (await searchParams).ref;
    const isMock = (await searchParams).mock === 'true';

    return (
        <div className="container min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-green-100 p-6 rounded-full text-green-600 mb-8 animate-in zoom-in duration-500">
                <CheckCircle2 className="h-16 w-16" />
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                Masterpiece Secured!
            </h1>

            <p className="text-muted-foreground max-w-xl mx-auto italic font-light text-lg mb-12">
                Thank you for your acquisition. Your order has been placed successfully and our curators are preparing your selection for safe transit.
            </p>

            <div className="bg-white border border-border/50 p-8 rounded-2xl max-w-md w-full mb-12 shadow-xl shadow-primary/5">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order Reference</span>
                    <span className="font-mono text-sm font-bold text-primary">{ref}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                    <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
                        {isMock ? "Mock Paid" : "Payment Logged"}
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <Link
                    href="/gallery"
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 flex items-center"
                >
                    Acquire More Art <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button className="bg-white border border-border hover:border-primary/20 px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all">
                    Download Receipt
                </button>
            </div>

            <p className="mt-20 text-xs text-muted-foreground font-light flex items-center">
                <Package className="h-4 w-4 mr-2" />
                A confirmation email has been sent to your address with tracking details.
            </p>
        </div>
    );
}
