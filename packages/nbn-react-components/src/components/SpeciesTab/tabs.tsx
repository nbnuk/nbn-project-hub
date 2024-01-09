import { lazy, Suspense } from 'react';

import { Spinner } from '@material-tailwind/react';

// Dynamically import the components used by tabs as not all tabs may be used.
const SpeciesClassification = lazy(() => import('../SpeciesClassification/SpeciesClassification'));
const SpeciesDataPartners = lazy(() => import('../SpeciesDataPartners/SpeciesDataPartners'));
const SpeciesGallery = lazy(() => import('../SpeciesGallery/SpeciesGallery'));
const SpeciesLiterature = lazy(() => import('../SpeciesLiterature/SpeciesLiterature'));
const SpeciesNames = lazy(() => import('../SpeciesNames/SpeciesNames'));
const SpeciesOverview = lazy(() => import('../SpeciesOverview/SpeciesOverview'));
const SpeciesRecords = lazy(() => import('../SpeciesRecords/SpeciesRecords'));
const SpeciesSequences = lazy(() => import('../SpeciesSequences/SpeciesSequences'));

// -----------------------------------------------------------------------------

interface ITab {
    label: string;
    value: string;
    component: React.JSX.Element;
}

// Use lowercase for tab names.
type TTabName = 'classification' | 'data' | 'gallery' | 'literature' | 'names' |
                'overview' |  'records' |'sequences';
export type TTabNames = Array<TTabName>;

// -----------------------------------------------------------------------------
// Create and return a single tab object, based upon the supplied tab name.

function makeTab(tvk: string, tabName: TTabName): ITab|null {
    
    const capital = (s: string): string => (s.charAt(0).toUpperCase() + s.slice(1));
    
    switch (tabName) {
        case 'overview': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesOverview tvk={tvk} />
                </Suspense>
                </>
            };
        }
        case 'gallery': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesGallery tvk={tvk}/>
                </Suspense>
                </>
            };
        }
        case 'names': {
            return {
                label: capital(tabName),
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesNames tvk={tvk} />
                </Suspense>
                </>
            };
        }
        case 'classification': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesClassification tvk={tvk} />
                </Suspense>
                </>
            };
        }
        case 'records': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesRecords tvk={tvk} />
                </Suspense>
                </>
            };
        }        
        case 'literature': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesLiterature tvk={tvk} />
                </Suspense> 
                </>
            };
        }
        case 'sequences': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesSequences tvk={tvk} />
                </Suspense>
                </>
            };
        }
        case 'data': {
            return {
                label: capital(tabName), 
                value: tabName, 
                component: 
                <>
                <Suspense fallback={<Spinner />}>
                    <SpeciesDataPartners tvk={tvk} />
                </Suspense>
                </>
            };
        }        
        default: {
            console.error(`Unknown tab name: ${tabName}`);
        }
    }
    return null;
}
// -----------------------------------------------------------------------------

export function makeTabs(tvk: string, tabNames?: TTabNames): ITab[] {

    const tabs: ITab[] = [];
    // Use all tabs if none supplied.
    const tabNamesToUse = tabNames ??= ['overview', 'gallery', 'names', 
        'classification', 'records', 'literature', 'sequences', 'data'];
    for (const tabName of tabNamesToUse) {
        const tab: ITab|null = makeTab(tvk, tabName);
        if (tab) {
            tabs.push(tab);
        }
    }
    // Add 'overview' tab if no others exist.
    if (tabs.length === 0) {    
        const tab: ITab|null = makeTab(tvk, 'overview');
        if (tab) {
            tabs.push(tab);
        }
    }
    return tabs;
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------

