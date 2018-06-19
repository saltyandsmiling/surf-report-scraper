import { createShallow } from '@material-ui/core/test-utils';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Wind from '../src/Wind';

enzyme.configure({ adapter: new Adapter() });

describe('WindComponent', () => {
  let props;
  let mountedWind;

  const wind = () => {
    if (!mountedWind) {
      const shallow = createShallow();
      mountedWind = shallow(<Wind {...props} />);
    }
    return mountedWind;
  };

  beforeEach(() => {
    props = {
      classes: {},
      wind: [{ timestamp: 'time', speed: 1, direction: 'SSW' }],
    };
    mountedWind = undefined;
  });

  it('always renders a div', () => {
    const divs = wind().dive().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

});
