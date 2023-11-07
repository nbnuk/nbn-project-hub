
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import * as L from 'leaflet';
import 'leaflet-easyprint';

import { render, screen } from '@testing-library/react';
import { SpeciesMap } from './SpeciesMap';

const logSpyWarn = jest.spyOn(console, 'warn');
const logSpyError = jest.spyOn(console, 'error');

// Kludge to force Leaflet code to be included for the benefit of easyprint.
// Without a call to L, easyprint isn't able to resolve and will error.
if (L.Browser.ielt9) {
  alert('Dummy message');
}

// Tests: tvk
test('tvk - interactive', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'}
            interactive={'1'} 
          /> );
  const linkElement = screen.queryByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('tvk - non-interactive', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'}
          /> );
  const linkElement = screen.queryByText(/NBNSYS0000027783/i);
  expect(linkElement).not.toBeInTheDocument();
});

// Tests: base
test('base - default interactive', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'}
            interactive={'1'} 
          /> );
  const linkSimple = screen.queryByText(/simple/i);
  const linkRoad = screen.queryByText(/road/i);
  const linkTerrain = screen.queryByText(/terrain/i);
  const linkSatellite = screen.queryByText(/satellite/i);

  expect(linkSimple).toBeInTheDocument();
  expect(linkRoad).toBeInTheDocument();
  expect(linkTerrain).toBeInTheDocument();
  expect(linkSatellite).toBeInTheDocument();
});

test('base - custom interactive', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'}
            interactive={'1'} 
            base={'road,junk,terrain'}
          /> );
  const linkRoad = screen.queryByText(/road/i);
  const linkTerrain = screen.queryByText(/terrain/i);
  const linkJunk = screen.queryByText(/junk/i);
  const linkSimple = screen.queryByText(/simple/i);

  expect(linkTerrain).toBeInTheDocument();
  expect(linkRoad).toBeInTheDocument();
  expect(linkJunk).not.toBeInTheDocument();
  expect(linkSimple).not.toBeInTheDocument();
});

// Tests: attributions
test('attributions - internal', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'}
            logo={'2'} 
          /> );
  const elem = screen.queryByText(/OpenStreetMap/i);
  expect(elem).toBeInTheDocument();
  
});

// Tests: query
test('tvk - interactive', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'}
            interactive={'1'} 
            query={'https://records-ws.nbnatlas.org/ogc/wms/reflect?q=*:*&fq=species:%22Maniola%20jurtina%22+AND+year:[2018+TO+2023]'}
          /> );
  const linkElement = screen.queryByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

// Tests: bl, tr
test('bl & tr - basic', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            bl={'TL512637'}
            tr={'TG392674'}
            interactive={'1'} 
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('bl & tr - switched parameters', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            bl={'TG392674'}
            tr={'TL512637'}
            interactive={'1'} 
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('bl & tr - invalid chars', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            bl={'TL-512637'}
            tr={'TG#392674'}
            interactive={'1'} 
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'bl' contains " + 
          "invalid characters. Using the value 'TL512637' instead");  
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'tr' contains " + 
          "invalid characters. Using the value 'TG392674' instead");  
});

test('bl & tr - invalid gridrefs', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            bl={'ZL512637'}
            tr={'ZG392674'}
          /> );
  expect(logSpyError).toHaveBeenCalledWith("Invalid grid reference: 'ZL512637'");  
  expect(logSpyError).toHaveBeenCalledWith("Invalid grid reference: 'ZG392674'");  
});

test('bl & tr - one parameter missing', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            bl={'ZL512637'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Either both or neither of the " + 
          "parameters 'bl' and 'tr' must be supplied");  
});

// Tests: blCoord, trCoord
test('blCoord & trCoord - basic', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            blCoord={'551248,263773'}
            trCoord={'639251,367412'}
            interactive={'1'} 
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('blCoord & trCoord - switched parameters', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            blCoord={'639251,367412'}
            trCoord={'551248,263773'}
            interactive={'1'} 
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('blCoord & trCoord - invalid chars', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            blCoord={'551-248,263773'}
            trCoord={'639251,367+412'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'blCoord' contains " + 
    "invalid characters. Using the value '551248,263773' instead");  
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'trCoord' contains " + 
    "invalid characters. Using the value '639251,367412' instead");  
});

test('blCoord & trCoord - invalid Northing/Easting', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            blCoord={'9996354545345349251,367412'}
            trCoord={'9996354545345349251,167412'}
          /> );
  expect(logSpyError).toHaveBeenCalledWith("Invalid Northing/Easting: '9996354545345349251,367412'");  
  expect(logSpyError).toHaveBeenCalledWith("Invalid Northing/Easting: '9996354545345349251,167412'");  
});

test('blCoord & trCoord - one parameter missing', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            blCoord={'551248,263773'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Either both or neither of the " + 
          "parameters 'blCoord' and 'trCoord' must be supplied");  
});

// Tests: b0from, b0to, b1from, b1to, b2from, bt2to
test('b0from, b0to, b1from, b1to, b2from, bt2to - basic', () => {
  render( <SpeciesMap 
            tvk={'NHMSYS0001387317'} 
            b0from={'1600'}
            b0to={'1987'}
            b1from={'1988'}
            b1to={'1997'}
            b2from={'1998'}
            b2to={'2025'}
            interactive={'1'}
          /> );
  const linkElement1 = screen.getByText(/NHMSYS0001387317: 1600-1987/i);
  const linkElement2 = screen.getByText(/NHMSYS0001387317: 1988-1997/i);
  const linkElement3 = screen.getByText(/NHMSYS0001387317: 1998-2025/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});

// Tests: skipped parameters
test('skipped parameters - basic', () => {
  render( <SpeciesMap 
            tvk={'NBNSYS0000027783'} 
            gd={'10km'}
            b0bord={'FF0000'}
            b1bord={'FF0000'}
            b2bord={'FF0000'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'gd' is not implemented. It will be ignored.");  
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'b0bord' is not implemented. It will be ignored.");  
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'b1bord' is not implemented. It will be ignored.");  
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'b2bord' is not implemented. It will be ignored.");  
});

