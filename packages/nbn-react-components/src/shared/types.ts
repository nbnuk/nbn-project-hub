import { z } from "zod";

export const OccurrenceSchema = z.object({
    uuid: z.string(),
    occurrenceID: z.string(),
    scientificName: z.string().optional(),
    vernacularName: z.string().optional(),
    taxonRank: z.string().optional(),
    eventDate: z.number().optional(),
    country: z.string().optional(),
    stateProvince: z.string().optional(),
    gridReference: z.string().optional(),
    dataResourceName: z.string().optional(),
    dataProviderName: z.string().optional(),
    collector: z.string().optional(),
    basisOfRecord: z.string().optional(),
    evenDate: z.number().optional(),
    thumbnailUrl: z.string().optional(),
    thumbWidth: z.number().optional(),
    thumbHeight: z.number().optional(), 
  });
  
  export const OccurrenceSearchResultSchema = z.object({
    pageSize: z.number(),
    startIndex: z.number(),
    totalRecords: z.number(),
    sort: z.string(),
    dir: z.string(),
    status: z.string(),
    occurrences: z.array(OccurrenceSchema),
  });
  
  export type Occurrence = z.TypeOf<typeof OccurrenceSchema>;
  export type OccurrenceSearchResult = z.TypeOf<typeof OccurrenceSearchResultSchema>;