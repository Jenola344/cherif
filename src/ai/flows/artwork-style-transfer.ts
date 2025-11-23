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
      'The room image with the artwork\