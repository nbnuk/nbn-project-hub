
import { ExploreCharts, ExploreSelect, 
        SpeciesClassification, SpeciesGallery, SpeciesNames,
        SpeciesOverview } from '../../components';

import { IExploreSelect } from '../ExploreSelect/select';

// -----------------------------------------------------------------------------

interface ITab {
    label: string;
    value: string;
    component: React.JSX.Element;
}
// -----------------------------------------------------------------------------

export function makeTabs(props: IExploreSelect): ITab[] {
  
    const tabs: ITab[] = [];
    tabs.push({
      label: 'Explore',
      value: 'explore',
      component: <ExploreSelect {...props} />
    });
    if (props.isGroup === false) {

    }
    if (props.isGroup === false && props.species != null) {
        tabs.push({
            label: 'National',
            value: 'overview',
            component: <SpeciesOverview tvk={props.species.guid} />
        });         
        tabs.push({
            label: 'Charts',
            value: 'charts',
            component: <ExploreCharts {...props} />
        });
        tabs.push({
            label: 'Gallery',
            value: 'gallery',
            component: <SpeciesGallery tvk={props.species.guid} />
        });                
        tabs.push({
            label: 'Names',
            value: 'names',
            component: <SpeciesNames tvk={props.species.guid} />
        });
       
        tabs.push({
            label: 'Classification',
            value: 'classification',
            component: <SpeciesClassification tvk={props.species.guid} />
        });
    }
    return tabs;
  }
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
