import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import {mockData} from '../mock-data';
import {extractLocations, getEvents} from '../api';

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
    });
  });
});

describe('<App /> integration', function() {
  test('App passes "events" state as a prop to EventList', function() {
    const AppWrapper = mount(<App/>);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App/>);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).
        toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user',
      async () => {
        const AppWrapper = mount(<App/>);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(
            event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
      });

  test('get list of all events when user selects "See all cities"',
      async () => {
        const AppWrapper = mount(<App/>);
        const suggestionItems = AppWrapper.find(CitySearch).
            find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
      });

  describe('Number of Events', function() {
    test(
        'is properly passed on as a prop to NumberOfEvents',
        () => {
          const AppWrapper = mount(<App/>);
          AppWrapper.setState({numberOfEvents: 20});
          expect(AppWrapper.find(NumberOfEvents).props().eventNum).toBe(20);
          AppWrapper.unmount();
        });

    test('check if state in the app changes on input change in NumberOfEvents',
        () => {
          const AppWrapper = mount(<App/>);
          const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
          NumberOfEventsWrapper.find('input.event-num-input').simulate('change', {
            target: {value: 12},
          });
          expect(NumberOfEventsWrapper.state('eventNum')).toBe(12);
          expect(AppWrapper.state('numberOfEvents')).toBe(12);
          AppWrapper.unmount();
        });

    test('check if events match the content of the mock data', async () => {
      const AppWrapper = mount(<App/>);
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('input.event-num-input').simulate('change', {
        target: {value: 10},
      });
      await getEvents();
      expect(AppWrapper.state('events')).toEqual(mockData.slice(0, 10));
      AppWrapper.unmount();
    });
  });
});