import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReportCardContainer from '../src/ReportCardContainer';

enzyme.configure({ adapter: new Adapter() });

describe('ReportCardContainer', () => {
  let props;
  let mountedRCContainer;

  const rcContainer = () => {
    if (!mountedRCContainer) {
      mountedRCContainer = enzyme.shallow(<ReportCardContainer {...props} />);
    }
    return mountedRCContainer;
  };

  beforeEach(() => {
    props = {
      data: undefined,
    };
    mountedRCContainer = undefined;
  });

  it('does not render <ReportCards /> if this.state.data is null', () => {
    const ReportCards = rcContainer().find('div');

    expect(ReportCards.length).toEqual(1);
  });

  // it('does render <ReportCards /> if this.state.data is not null', () => {
  //   const ReportCards = rcContainer().find('ReportCards');
  //   ReportCards.setState({ data: {}});
  //   expect(ReportCards.length).toEqual(1);
  //
  // })

});

/*
tests to add
'<ReportCards /> renders if this.state.data is passed'
'componentDidMount makes API call and sets state based on results'
 */
