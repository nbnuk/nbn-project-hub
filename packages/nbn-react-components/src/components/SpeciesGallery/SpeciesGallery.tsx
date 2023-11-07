import { useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import { Gallery } from 'react-grid-gallery';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import './sg.css';

import { CustomImage, fetchImages, makeSlides, Slide } from './images';

// External library documentation:
// https://benhowell.github.io/react-grid-gallery/
// https://www.npmjs.com/package/yet-another-react-lightbox
// https://yet-another-react-lightbox.com/plugins/captions

// Example page:
// https://species.nbnatlas.org/species/NHMSYS0000504624#gallery

// -----------------------------------------------------------------------------

interface ISpeciesImage {

  /** Maximum number of rows to display. Unlimited if not supplied. */
  maxRows?: number;
  tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesGallery({ maxRows, tvk }: ISpeciesImage): JSX.Element {

  const numRows = maxRows ??= 50;
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<CustomImage[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = (index: number, /*item: CustomImage*/) => setIndex(index);

  useEffect(() => {
    setImages([]);
    setIsError(false);
    setIsLoading(true);
    fetchImages(tvk)
    .then((data: CustomImage[]) => { 
        setImages(data); 
        setSlides(makeSlides(data));    
      })
    .catch((err) => {
        console.error(`Error loading images for tvk '${tvk}'. ${err}`);
        setIsError(true);
      })
    .finally(() => {
        setIsLoading(false);
      })
    }, [tvk]);

  const noImages: boolean = (tvk !== '') && (images.length === 0);

  return (
    <div className='sg_div'>
      {(isLoading) ? (<CircularProgress />) : 
          ((isError) ? (`Error loading images for tvk: ${tvk}`) : 
            ((noImages) ? (`No images for tvk: ${tvk}`): null))}
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
        maxRows={numRows}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        captions={{ showToggle: true, descriptionMaxLines: 5 }}
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------


