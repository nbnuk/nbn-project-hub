import { ITaxon } from './utils';

// -----------------------------------------------------------------------------

interface ITaxonListProps {
    taxons: ITaxon[];
}
// -----------------------------------------------------------------------------
// Horizontal breadcrumb-style taxon list.

export function TaxonBreadcrumb ({ taxons }: ITaxonListProps): React.JSX.Element  {
    
  return (
    <ul className='flex flex-wrap items-center w-full px-4 py-2 rounded-md bg-blue-gray-50'>
      {taxons.map((taxon, index) => (
          <li key={index}>
            <a  
              className='text-sm text-blue-500 hover:underline' 
              href={taxon.url} 
              target='_blank' 
              rel='noreferrer'>
              {taxon.value}
              {(index < taxons.length - 1) ? ' /' : '' }
            </a>
            <span>&nbsp;</span>
          </li>
        ))}
    </ul>
  );
}
// -----------------------------------------------------------------------------
// Vertical taxon list with responsive identation.

export function TaxonList ({ taxons }: ITaxonListProps): React.JSX.Element {
  
    return (
        <>
        {taxons.map((taxon, index) => (
          <div key={index} className='flex'>
            <span className={`font-bold md:ml-[${index+1}rem]`}>
                {taxon.label}:&nbsp;&nbsp;
            </span>
                <a className='text-blue-500 hover:underline' 
                    href={taxon.url} 
                    target='_blank' 
                    rel='noreferrer'>
                  {taxon.value}
                </a>
          </div>
        ))}
        </>
    );
}
// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
