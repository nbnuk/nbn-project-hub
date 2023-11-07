import { z } from 'zod';

import { fetcher } from './fetcher';

// -----------------------------------------------------------------------------

const classificationBaseUrl = 'https://species.nbnatlas.org/species/';
const nameBaseUrl = 'https://species-ws.nbnatlas.org/species/';

export const getSpeciesClassificationUrl = (tvk: string|null|undefined): string => 
    { return tvk ? classificationBaseUrl + tvk + '#classification' : '#'; }

export const getSpeciesNameUrl = (tvk: string): string => 
    { return nameBaseUrl + tvk + '.json'; }

export const speciesNameFetcher = (url: string) => fetcher(url, SpeciesNameSchema);

// -----------------------------------------------------------------------------
// Define data artefacts associated with API call. Example AI call:
// https://species-ws.nbnatlas.org/species/BMSSYS0000045962.json

const ClassificationSchema = z.object({
    kingdom: z.string().nullish(),
    kingdomGuid: z.string().nullish(),
    phylum: z.string().nullish(),
    phylumGuid: z.string().nullish(),
    subphylum: z.string().nullish(),
    subphylumGuid: z.string().nullish(),
    class: z.string().nullish(),
    classGuid: z.string().nullish(),
    order: z.string().nullish(),
    orderGuid: z.string().nullish(),
    suborder: z.string().nullish(),
    suborderGuid: z.string().nullish(),
    superfamily: z.string().nullish(),
    superfamilyGuid: z.string().nullish(),
    family: z.string().nullish(),
    familyGuid: z.string().nullish(),
    subfamily: z.string().nullish(),
    subfamilyGuid: z.string().nullish(),
    tribe: z.string().nullish(),
    tribeGuid: z.string().nullish(),
    genus: z.string().nullish(),
    genusGuid: z.string().nullish(),
    scientificName: z.string().nullish(),
    guid: z.string().nullish(),
    species: z.string().nullish(),
    speciesGuid: z.string().nullish(),
});

const CommonNameSchema = z.object({
    infoSourceName: z.string().nullish(),
    language: z.string().nullish(),
    nameString: z.string().nullish(),
    status: z.string().nullish(),
});

const TaxonConceptSchema = z.object({
    nameAuthority: z.string().nullish(),
    nameComplete: z.string().nullish(),
    rankString: z.string().nullish(),
    taxonomicStatus: z.string().nullish(),
});

export type TTaxonConceptSchema = z.TypeOf<typeof TaxonConceptSchema>;

const SynonymSchema = z.object({
    nameAuthority: z.string().nullish(),
    nameComplete: z.string().nullish(),
    nameFormatted: z.string().nullish(),
    nameString: z.string().nullish(),
  });
  
export const SpeciesNameSchema = z.object({
    classification: ClassificationSchema,
    commonNames: z.array(CommonNameSchema),
    establishmentMeans: z.string().nullish(),
    synonyms: z.array(SynonymSchema),
    taxonConcept: TaxonConceptSchema,
});

export type TSpeciesNameSchema = z.TypeOf<typeof SpeciesNameSchema>;

// -----------------------------------------------------------------------------

export interface ITaxon {
    label: string;
    value: string;
    url: string
}
// -------

function makeTaxon(taxonomy: ITaxon[], label: string, value: string|null|undefined, 
                    tvk: string|null|undefined): void {

    if (value) {
        const taxon: ITaxon = {
            label: label,
            value: value ??= 'Not supplied',
            url: getSpeciesClassificationUrl(tvk)
        };
        taxonomy.push(taxon);
    }
}
// -------

export function makeTaxonomy(data: TSpeciesNameSchema|null|undefined): ITaxon[] {
    
    const taxonomy: ITaxon[] = [];
    if (data) {
        const tax = data.classification;
        makeTaxon(taxonomy, 'kingdom', tax.kingdom, tax.kingdomGuid);
        makeTaxon(taxonomy, 'phylum', tax.phylum, tax.phylumGuid);
        makeTaxon(taxonomy, 'subphylum', tax.subphylum, tax.subphylumGuid);
        makeTaxon(taxonomy, 'class', tax.class, tax.classGuid);
        makeTaxon(taxonomy, 'order', tax.order, tax.orderGuid);
        makeTaxon(taxonomy, 'suborder', tax.suborder, tax.suborderGuid);
        makeTaxon(taxonomy, 'superfamily', tax.superfamily, tax.superfamilyGuid);
        makeTaxon(taxonomy, 'family', tax.family, tax.familyGuid);
        makeTaxon(taxonomy, 'subfamily', tax.subfamily, tax.subfamilyGuid);
        makeTaxon(taxonomy, 'tribe', tax.tribe, tax.tribeGuid);
        makeTaxon(taxonomy, 'genus', tax.genus, tax.genusGuid);
        makeTaxon(taxonomy, 'species', tax.species, tax.speciesGuid);
    }
    return taxonomy;
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
