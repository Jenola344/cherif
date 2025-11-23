'use server';

/**
 * @fileOverview Implements the Artwork Style Transfer flow, allowing users to upload a room picture and preview artwork styles on it.
 *
 * - artworkStyleTransfer - Applies the style of an artwork to a room image.
 * - ArtworkStyleTransferInput - The input type for the artworkStyleTransfer function.
 * - ArtworkStyleTransferOutput - The return type for the artworkStyleTransfer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtworkStyleTransferInputSchema = z.object({
  roomImage: z
    .string()
    .describe(
      'A picture of the user’s room, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  artworkImage: z
    .string()
    .describe(
      'A picture of the artwork, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type ArtworkStyleTransferInput = z.infer<typeof ArtworkStyleTransferInputSchema>;

const ArtworkStyleTransferOutputSchema = z.object({
  styledImage: z
    .string()
    .describe(
      'The room image with the artwork style applied, as a data URI.'
    ),
});
export type ArtworkStyleTransferOutput = z.infer<
  typeof ArtworkStyleTransferOutputSchema
>;

export async function artworkStyleTransfer(
  input: ArtworkStyleTransferInput
): Promise<ArtworkStyleTransferOutput> {
  return artworkStyleTransferFlow(input);
}

const artworkStyleTransferFlow = ai.defineFlow(
  {
    name: 'artworkStyleTransferFlow',
    inputSchema: ArtworkStyleTransferInputSchema,
    outputSchema: ArtworkStyleTransferOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
            { media: { url: input.roomImage } },
            { media: { url: input.artworkImage } },
            { text: 'Apply the style of the second image (the artwork) to the first image (the room). The artwork should appear realistically placed on a wall within the room. Maintain the original composition and lighting of the room as much as possible.' },
        ],
        config: {
            responseModalities: ['IMAGE'],
        },
    });

    if (!media?.url) {
        throw new Error('The AI model did not return an image.');
    }
    
    return { styledImage: media.url };
  }
);
