import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const artworks = await prisma.artwork.findMany({
            select: {
                id: true,
                title: true,
                imageUrl: true,
                prices: true,
            }
        });
        return NextResponse.json(artworks);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 });
    }
}
