import { prisma } from '@/lib/prisma';
import ArtworkForm from '@/components/admin/ArtworkForm';

export const dynamic = 'force-dynamic';

async function getCategories() {
    return await prisma.category.findMany();
}

export default async function NewArtworkPage() {
    const categories = await getCategories();

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <header>
                <h1 className="text-4xl font-display font-bold mb-2">New Portfolio Addition</h1>
                <p className="text-muted-foreground italic font-light">Register a new piece into the gallery's digital presence.</p>
            </header>

            <div className="bg-white p-10 rounded-3xl border border-border/50 shadow-xl shadow-primary/5">
                <ArtworkForm categories={categories} />
            </div>
        </div>
    );
}
