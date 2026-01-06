import Link from 'next/link';

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <span className="text-2xl font-display font-bold text-primary tracking-tighter">
                CHERIF
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground pt-1">
                Gallery
            </span>
        </div>
    );
}
