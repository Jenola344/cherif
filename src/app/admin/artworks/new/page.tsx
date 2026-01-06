import ArtworkForm from '@/components/admin/ArtworkForm';
import db from '@/lib/db-mock';

// Force dynamic because db is mutable
export const dynamic = 'force-dynamic';

export default function NewArtworkPage() {
    const categories = db.categories;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Add New Artwork</h1>
            <ArtworkForm categories={categories} />
        </div>
    );
}
