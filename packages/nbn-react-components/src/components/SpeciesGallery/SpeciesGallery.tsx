import { useEffect, useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import { Lightbox } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import './sg.css';

import { CustomImage, fetchImages, makeSlides, Slide } from './images';

// https://benhowell.github.io/react-grid-gallery/
// https://www.npmjs.com/package/yet-another-react-lightbox
// https://yet-another-react-lightbox.com/plugins/captions

// -----------------------------------------------------------------------------

interface ISpeciesImage {

  tvk: string;
}
// -----------------------------------------------------------------------------

export function SpeciesGallery({ tvk }: ISpeciesImage): JSX.Element {

  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<CustomImage[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [noImages, setNoImages] = useState<boolean>(false);

  const handleClick = (index: number, /*item: CustomImage*/) => setIndex(index);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetchImages(tvk)
    .then((data: CustomImage[]) => { 
        setImages(data); 
        setSlides(makeSlides(data));    
      })
    .catch((err) => {
        console.error(`Error loading images for tvk '${tvk}'. ${err}`);
        setImages([]);
        setIsError(true);
      })
    .finally(() => {
        setNoImages(tvk !== '' && images.length === 0);
        setIsLoading(false);
      })
    }, [tvk, images.length]);
  
  return (
    <div className='sg_div'>
      <p>
      {(isLoading) ? ('Loading...') : 
          ((isError) ? (`Error loading images for tvk: ${tvk}`) : 
            ((noImages) ? (`No images for tvk: ${tvk}`): (tvk)))}
      </p>
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
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


