
import { render, screen } from '@testing-library/react';
import SimpleMap from './SimpleMap';

test('TVK', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('blCoord & trCoord', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            blCoord={'551248,263773'}
            trCoord={'639251,367412'}
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});

test('bl & tr', () => {
  render( <SimpleMap elementId={'map'} 
            tvk={'NBNSYS0000027783'} 
            bl={'TL512637'}
            tr={'TG392674'}
          /> );
  const linkElement = screen.getByText(/NBNSYS0000027783/i);
  expect(linkElement).toBeInTheDocument();
});
