import { z } from "zod";

export const EntitySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const PlaceSchema = z.object({
  id: z.number(),
  category: z.string(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  lat: z.number(),
  lon: z.number(),
  rating: z.number(),
  imageUrl: z.string(),
  Entities: z.array(EntitySchema).optional(), // Связанные сущности
});

export const PlaceArraySchema = PlaceSchema.array();

export type PlaceArrayT = z.infer<typeof PlaceArraySchema>;

export type PlaceT = z.infer<typeof PlaceSchema>;
export type EntityT = z.infer<typeof EntitySchema>;

export type PlaceSliceT = {
  places: PlaceArrayT;
  loading: boolean;
  activePlace: PlaceT | null;
  isModalVisible: boolean;
  activePlaces: PlaceArrayT;
  isYamapReady: boolean;
};
