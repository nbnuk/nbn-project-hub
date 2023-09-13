import { Params, IMapTitleProps } from './params';

// const logSpyWarn = jest.spyOn(console, 'warn');
// const logSpyError = jest.spyOn(console, 'error');


test('title - invalid value', () => {
    
    const props: IMapTitleProps = {
        tvk: 'NHMSYS0001387317',
        title: '2',
        css: 'https://www.hbrg.org.uk/CommonItems/nbn.css'
    };
    
    const params = new Params(props);
    expect(params.title).toBe('sci');
    
  });

test('css - invalid value', () => {
    
    const props: IMapTitleProps = {
        tvk: 'NHMSYS0001387317',
        title: '2',
        css: "';- www.hbrg.org.uk/CommonItems/nbn.css"
    };
    
    const params = new Params(props);
    expect(params.css).toBe('');
    
  });

  test('optional values', () => {
    
    const props: IMapTitleProps = {
        tvk: 'NHMSYS0001387317',
    };
    
    const params = new Params(props);
    expect(params.css).toBe('');
    expect(params.title).toBe('sci');
    
  });