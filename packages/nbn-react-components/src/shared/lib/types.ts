
// -----------------------------------------------------------------------------

export interface ILocation {

    latitude: number;
    longitude: number;
    radius: number;
}

export interface IExploreMap {
    isGroup: boolean;
    location: ILocation;
    name: string;
}

// -----------------------------------------------------------------------------
// End
// -----------------------------------------------------------------------------
