
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import { render, screen } from '@testing-library/react';
import SimpleMap from './SimpleMap';

const logSpyWarn = jest.spyOn(console, 'warn');
const logSpyError = jest.spyOn(console, 'error');


// Tests: tvk
test('tvk - basic', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

// Tests: bl, tr
test('bl & tr - basic', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bl={'TL512637'}
            tr={'TG392674'}
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('bl & tr - switched parameters', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bl={'TG392674'}
            tr={'TL512637'}
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('bl & tr - invalid chars', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bl={'TL-512637'}
            tr={'TG#392674'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'bl' contains " + 
          "invalid characters. Using the value 'TL512637' instead");  
  expect(logSpyWarn).toHaveBeenCalledWith("Parameter 'tr' contains " + 
          "invalid characters. Using the value 'TG392674' instead");  
});

test('bl & tr - invalid gridrefs', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bl={'ZL512637'}
            tr={'ZG392674'}
          /> );
  expect(logSpyError).toHaveBeenCalledWith("Invalid grid reference: 'ZL512637'");  
  expect(logSpyError).toHaveBeenCalledWith("Invalid grid reference: 'ZG392674'");  
});

test('bl & tr - one parameter missing', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bl={'ZL512637'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Either both or neither of the " + 
          "parameters 'bl' and 'tr' must be supplied");  
});

// Tests: blCoord, trCoord
test('blCoord & trCoord - basic', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            blCoord={'551248,263773'}
            trCoord={'639251,367412'}
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('blCoord & trCoord - switched parameters', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            blCoord={'639251,367412'}
            trCoord={'551248,263773'}
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('blCoord & trCoord - invalid chars', () => {
  render( <SimpleMap elementId={'map'} 
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
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            blCoord={'9996354545345349251,367412'}
            trCoord={'9996354545345349251,167412'}
          /> );
  expect(logSpyError).toHaveBeenCalledWith("Invalid Northing/Easting: '9996354545345349251,367412'");  
  expect(logSpyError).toHaveBeenCalledWith("Invalid Northing/Easting: '9996354545345349251,167412'");  
});

test('blCoord & trCoord - one parameter missing', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            blCoord={'551248,263773'}
          /> );
  expect(logSpyWarn).toHaveBeenCalledWith("Either both or neither of the " + 
          "parameters 'blCoord' and 'trCoord' must be supplied");  
});

// Tests: b0from, b0to, b1from, b1to, b2from, bt2to
test('b0from, b0to, b1from, b1to, b2from, bt2to - basic', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NHMSYS0001387317'} 
            b0from={'1600'}
            b0to={'1987'}
            b1from={'1988'}
            b1to={'1997'}
            b2from={'1998'}
            b2to={'2025'}          
          /> );
  const linkElement1 = screen.getByText(/NHMSYS0001387317: 1600-1987/i);
  const linkElement2 = screen.getByText(/NHMSYS0001387317: 1988-1997/i);
  const linkElement3 = screen.getByText(/NHMSYS0001387317: 1998-2025/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});

// Tests: bg
/* TODO: Jest Fetch not supported...
See: 
https://www.leighhalliday.com/mock-fetch-jest
https://bobbyhadz.com/blog/javascript-referenceerror-fetch-is-not-defined
*/
/*
test('bg - basic', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bg={'vc'}
          /> );
  const linkElement = screen.getByText(/VCs/i);
  expect(linkElement).toBeInTheDocument();
});
*/
// Tests: skipped parameters
test('skipped parameters - basic', () => {
  render( <SimpleMap elementId={'map'} 
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

