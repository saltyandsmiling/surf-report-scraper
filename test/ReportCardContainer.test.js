import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import React from 'react';
import ReportCardContainer from '../src/ReportCardContainer';

import renderer from 'react-test-renderer';

enzyme.configure({ adapter: new Adapter() });


describe('ReportCardContainer', () => {
  let props;
  let mountedRCContainer;
  const rcContainer = () => {
    if (!mountedRCContainer) {
      mountedRCContainer = enzyme.mount(<ReportCardContainer {...props} />);
    }
    return mountedRCContainer;
  };

  beforeEach(() => {
    props = {
      data: undefined,
    };
    mountedRCContainer = undefined;
  });

  it('returns a single div element if data is undefined', () => {
    const divs = rcContainer().find('div');
    expect(divs.length).toBeGreaterThan(0);
  })
});
