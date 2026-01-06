'use client';

import { createArtwork } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

type Category = { id: string; title: string };

export default function ArtworkForm({ categories }: { categories: Category[] }) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            await createArtwork(formData);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message
            });
            setLoading(false);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required placeholder="e.g., Sunset Serenity" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select name="categoryId" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required placeholder="Describe the artwork..." />
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" required placeholder="https://..." defaultValue="https://picsum.photos/seed/art/800/600" />
                <p className="text-xs text-muted-foreground">Using random placeholder default.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="priceSmall">Base Price ($)</Label>
                    <Input id="priceSmall" name="priceSmall" type="number" required min="1" defaultValue="100" />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating...' : 'Create Artwork'}
            </Button>
        </form>
    );
}
