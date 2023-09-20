
import { sanitiseParam, sanitiseParamList,  } from './sanitise';

// -----------------------------------------------------------------------------

export interface IMapTitleProps {
    /** Taxon version key representing the observed species to be mapped. */
    tvk: string;
    /** Display a link to the NBN terms ('1') or disables it ('0'). If 
     * omitted the terms are displayed. */
    terms?: string;
    /** Displays the scientific name ('sci'), common name ('com') as a title or 
     * disables it ('0'). If omitted the scientific name is displayed. */
    title?: string;
    /** Width, in pixels, of the map. If neither height nor width specified 
    * the width is 350. */
    w?: string;    
  }
  
// -----------------------------------------------------------------------------

export class Params {
    // supplied members
    private props: IMapTitleProps;
    // derived members
    public tvk: string;
    public terms: string;
    public title: string;
    public w: string;

    // -------------------------------------------------------------------------
    /** Constructor.
     * 
     * @param {IMapTitleProps} props - Configuration parameters.
     */
    constructor(props: IMapTitleProps){
        this.props = props;
        this.tvk = this.props.tvk.replace(/[^a-zA-Z0-9]/g, ''); 
        this.title = sanitiseParamList('title', this.props.title, ['0',
                                            'com', 'sci'], 'sci');
        this.terms = sanitiseParam('terms', this.props.terms, /[^0-1]/g, '1');
        this.w = sanitiseParam('w', props.w, /[^0-9]/g, '350');
    }
    // -------------------------------------------------------------------------

    async fetchHeading(): Promise<string> {
        let heading = '';
        const url = `https://species-ws.nbnatlas.org/species/${this.tvk}`;
        console.debug(url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            switch (this.title) {
                case '0': {
                    heading = '';
                    break;
                }
                case 'com': {
                    try {
                        heading = data['commonNames'][0]['nameString'];
                    }
                    catch (err) {
                        heading = `${data['taxonConcept']['nameString']} (no common name)`;
                    }
                    break;
                }
                case 'sci': {
                        heading = data['taxonConcept']['nameString'];
                    break;
                }
                default: {
                    console.error(`Unknown map title type: ${this.title}`);
                        heading = data['taxonConcept']['nameString'];
                    break;
                }
            }
        }
        catch (err) {
            console.error(`Error occurred fetching map title. ${err}`)
            heading = this.tvk;
        }
        return heading;
    }    
    // -------------------------------------------------------------------------
    
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
