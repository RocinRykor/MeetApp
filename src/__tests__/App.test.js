import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
  describe('Renders', () => {
    let AppWrapper;
    beforeEach(() => {
      AppWrapper = shallow(<App/>);
    });
    test('list of events', () => {

      expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('CitySearch', () => {
      expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  })
  });
});