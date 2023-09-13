
// -----------------------------------------------------------------------------

export interface IMapTitleProps {
    /** Taxon version key representing the observed species to be mapped. */
    tvk: string;
    /** Displays the scientific name ('sci'), common name ('com') as a title or 
     * disables it ('0'). If omitted the scientific name is displayed. */
    title?: string;
    /** Link to a CSS file to override default CSS settings. */
    css?: string;
  }
  
// -----------------------------------------------------------------------------

export class Params {
    // supplied members
    private props: IMapTitleProps;
    // derived members
    public tvk: string;
    public title: string;
    public css: string;

    // -------------------------------------------------------------------------
    /** Constructor.
     * 
     * @param {IMapTitleProps} props - Configuration parameters.
     */
    constructor(props: IMapTitleProps){
        this.props = props;
        // tvk: taxon version key (required)
        this.tvk = this.props.tvk.replace(/[^a-zA-Z0-9]/g, ''); 
        this.title = this.sanitiseParamList('title', this.props.title, ['0',
                                            'com', 'sci'], 'sci'); 
        this.css = this.sanitiseUrl('css', this.props.css);
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
    /** Sanitise a generic string as provided by a caller parameter.
     * 
     * @param {string} name - Name of parameter.
     * @param {string|undefined} param - Value of parameter.
     * @param {string} filter - Regex filter to be applied to string.
     * @returns {string} - Sanitised string.
     */
    sanitiseParam(name: string, param: string|undefined, filter: RegExp): string {
        let clean = '';
        if (param !== undefined) {
            clean = param.replace(filter, '');
            if (clean !== param) {
                console.warn(`Parameter '${name}' contains invalid characters. ` +
                             `Using the value '${clean}' instead`);
            }
        }
        return clean;
    }
    // -------------------------------------------------------------------------
    /** Check whether a supplied parameter matches an entry in a given list of
     * acceptable values.
     * 
     * @param {string} name - Name of parameter.
     * @param {string|undefined} param - Value of parameter.
     * @param {string[]} list - Array of acceptable values.
     * @param {string} preset - Return value if no match/undefined
     * @returns {string} - Matching value or preset if no match/undefined.
     */
    sanitiseParamList(name: string, param: string|undefined, list: string[],
                        preset: string = ''): string {
        
        let rv = '';
        if (param !== undefined) {
            const clean = this.sanitiseParam(name, param, /[^a-zA-Z0-9-]/g)
                              .toLowerCase();
            for (let i=0; i < list.length; i++) {
                if (clean === list[i]) {
                    rv = list[i];
                    break;
                }   
            }
            if (rv === '') {
                console.warn(`Parameter '${name}' has the unrecognised value ` +
                    `of '${clean}'. Acceptable values are: ${list.join(', ')}`);
            }
        }
        return (rv === '' ? preset : rv);
    }         
    // -------------------------------------------------------------------------
    /** Check whether a supplied parameter is a valid URL.
     * 
     * @param {string} name - Name of parameter.
     * @param {string} param - Value of parameter.
     * @returns {string} URL or empty string if undefined/invalid
     */
    sanitiseUrl(name: string, param: string|undefined): string {
        let url = '';
        if (param !== undefined) {
            url = param;
            try {
                new URL(url);
            }
            catch (err) {
                url = '';
                console.warn(`Parameter '${name}' is not a valid URL`);

            }
        }
        return url;
    }
    // -------------------------------------------------------------------------
    
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
