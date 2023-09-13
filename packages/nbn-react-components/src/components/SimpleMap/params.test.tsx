import { Params, ISimpleMapProps } from './params';

const props: ISimpleMapProps = {
    elementId: 'map',
    tvk: 'NHMSYS0001387317'
};

const params = new Params(props);

test('checkPairParams', () => {
    
    const t1_f = params.checkPairParams('p1', undefined, 'p2', undefined);
    const t2_t = params.checkPairParams('p1', 's1', 'p2', 's1');
    expect(t1_f).toBe(false);
    expect(t2_t).toBe(true);
  });
