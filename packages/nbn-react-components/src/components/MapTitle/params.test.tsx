import { Params, IMapTitleProps } from './params';

test('invalid values', () => {
    
    const props: IMapTitleProps = {
        tvk: 'NHMSYS0001387317',
        title: 'junk',
        terms: 'junk',
    };
    
    const params = new Params(props);
    expect(params.title).toBe('sci');
    expect(params.terms).toBe('1');
  });

  test('optional params', () => {
    
    const props: IMapTitleProps = {
        tvk: 'NHMSYS0001387317',
    };
    
    const params = new Params(props);
    expect(params.title).toBe('sci');
    expect(params.terms).toBe('1');    
  });