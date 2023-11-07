import {useEffect} from 'react'
import useSWR from 'swr';
import { z } from "zod";
import { fetcher } from '../../shared/lib/fetcher';
import '../../index.css'
import './grid-styles.css'
import { occurrences } from "./test-data";
import { Gallery } from "react-grid-gallery";
import { useOccurrenceSearch } from '../../shared/hooks/useOccurrenceSearch';
import { Occurrence } from '../../shared/types';
import { NBNDate } from '../ui-components';
import OccurrenceList from '../OccurrenceList';





// Define the props for the component
export interface PhotoGridProps {
  apiURL: string;
}

// Define the component
export const PhotoGrid = ({ apiURL }: PhotoGridProps) => {



  const thumbnails = occurrences?.map((occurrence) => ({
    src: occurrence.thumbnailUrl,
    width: occurrence.thumbWidth,
    height: occurrence.thumbHeight,
    customOverlay: (
      <div className="custom-overlay__caption">
        <div>{occurrence.scientificName}</div>
        <div>Date: <NBNDate timestamp={occurrence.eventDate} missing="-" /></div>
        <div>By: {occurrence.collector || "-"}</div>
        <div>{occurrence.dataResourceName}</div>
      </div>
    ),
  }));




  return (
    <div style={{width:'800px'}}>
      <Gallery images={thumbnails} enableImageSelection={false} defaultContainerWidth={800} />
    </div>
  );
};

export default PhotoGrid;
