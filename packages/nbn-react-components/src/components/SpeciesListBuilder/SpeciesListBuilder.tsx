import { useState } from 'react';
import { SpeciesAutoCompleteOrig, ISpecies } from '../SpeciesAutoCompleteOrig';

// -----------------------------------------------------------------------------

interface ISpeciesListBuilder {
  /** Optional flag to show abbreviated entries in selected list. Default false. */
  abbreviate?: boolean;
  /** Optional flag to sort selected species by scientific names.  Default true. */
  sort?: boolean;
  /** Optional callback function which will be called when submit button is
   * clicked. */
  submit?: (speciesList: ISpecies[]) => void;
}

const tdStyle = {
  verticalAlign: 'top',
  padding: 15
};

// -----------------------------------------------------------------------------

export default function SpeciesListBuilder({ abbreviate, sort, submit }: ISpeciesListBuilder): JSX.Element {
  
  const [speciesList, setSpeciesList] = useState<ISpecies[]>([]);
  const [, _setSpecies] = useState<ISpecies>();

  // Set defaults, if required.
  abbreviate ??= false;
  sort ??= true;
  
  // Return results to callback function, if supplied.
  const handleSubmitClick = () => {
    if (submit) {
      submit(speciesList);
    }
  }

  // Remove entry from the selected list.
  const handleListClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const tvk = e?.currentTarget?.id;
    const sl = speciesList;
    const i = sl.findIndex((e) => (e.tvk === tvk));
    if (i !== -1) {
      sl.splice(i, 1);
      setSpeciesList([...sl]);
    }
  }

  // Add an entry to the selected list, if not already present.
  const setSpecies=(species: ISpecies) => {
    _setSpecies(species);
    const i = speciesList.findIndex((e) => (e.tvk === species.tvk));
    if (i === -1) {
      const sl = [...speciesList, species];
      if (sort) {
        sl.sort((a, b) => (a.scientificName < b.scientificName ? -1 : 1));
      }
      setSpeciesList(() => [...sl]);
    }
  };

  return (
    <div>
      <table>
        <tr>
          <td style={tdStyle}>
            <SpeciesAutoCompleteOrig setSpecies={setSpecies} />
          </td>
          <td style={tdStyle}>
            {(submit) ? (<button onClick={handleSubmitClick}>Submit</button>) : ('')}
            <div className='sac_div'>
            <ul className='sac_ul'>
              {speciesList.map((item) => (
                <li key={item.tvk} 
                  id={item.tvk} 
                  data-scientificName={item.scientificName}
                  data-commonName={item.commonName}
                  data-rank={item.rank}      
                  onClick={handleListClick}>
                  <span className='sac_sciname'>{item.scientificName}</span>
                  {(abbreviate) ? ('') : 
                  (<>
                   <br />
                   <span className='sac_comname'>{item.commonName}</span>
                   <br />
                   <span className='sac_guid'>{item.tvk}</span>
                   <br />
                   <span className='sac_rank'>{item.rank}</span>
                   </>)}
                </li>
              ))}
            </ul>
            </div>
          </td>
        </tr>
      </table>
    </div>    
  );
  
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


