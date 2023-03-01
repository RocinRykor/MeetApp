import React from 'react';
import {shallow} from 'enzyme';
import Event from '../Event';
import {mockData} from '../mock-data';

describe('<Event /> component', () => {

  let EventWrapper, event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event}/>);
  });

  describe('Correctly render', () => {
    test('the basic component', () => {
      expect(EventWrapper).toBeDefined();
    });

    test('the summary as an h1 tag', () => {
      const summary = EventWrapper.find('h1.summary');
      expect(summary).toHaveLength(1);
      expect(summary.text()).toBe(event.summary);
    });

    test('the event location as an h2 tag', () => {
      const location = EventWrapper.find('h2.location');
      expect(location).toHaveLength(1);
      expect(location.text()).toBe(event.location);
    });

    test('the start time as an h2 tag', () => {
      const startTime = EventWrapper.find('h2.start-time');
      expect(startTime).toHaveLength(1);
      expect(startTime.text()).toBe(event.start.dateTime);
    });
  });
});