import { renderMap } from './LeafletMap'

document.querySelector('#map').innerHTML = renderMap({apiUrl:"Moths"})