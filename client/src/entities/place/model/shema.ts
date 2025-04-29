import { z } from "zod";

export const PlaceSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  lat: z.number(),
  lon: z.number(),
  rating: z.number(),
  imageUrl: z.string(),
});

export const PlaceArraySchema = PlaceSchema.array();

export type PlaceArrayT = z.infer<typeof PlaceArraySchema>;

export type PlaceT = z.infer<typeof PlaceSchema>;

export type PlaceSliceT = {
  places: PlaceArrayT;
  loading: boolean;
  activePlace: PlaceT | null;
};
