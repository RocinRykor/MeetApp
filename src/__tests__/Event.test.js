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

    test('ensure the state is defined', () => {
    expect(EventWrapper.state('extended')).toBeDefined();
  })

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

    test('the details button', () => {
      const detailsButton = EventWrapper.find('button.details-button');
      expect(detailsButton).toHaveLength(1);
    });
  });

  describe('Details area', () => {

    test('starts as collapsed with all extra details hidden', () => {
      const detailsButton = EventWrapper.find('button.details-button');
      expect(EventWrapper.state('extended')).toBe(false);
      expect(detailsButton.text()).toBe('Show Details');

      expect(EventWrapper.find('div.details')).toHaveLength(0);
      expect(EventWrapper.find('a.link')).toHaveLength(0);
      expect(EventWrapper.find('p.description')).toHaveLength(0);
    });

    test('expands when Show Details button is clicked', () => {
      const detailsButton = EventWrapper.find('button.details-button');
      detailsButton.simulate('click');

      /*
      * RETROSPECTIVE:
      * Here was an interesting issue of this test was working as expected until I added a check to see if the button text was updating correctly
      * All the details elements were displaying correctly but the button, according to the test was still saying 'Show Details'
      * ChatGPT pointed out that if the test is checking the state immediately after clicking the button, the state update may not have had a chance to take effect yet
      * The solution was to add a short timeout after clicking the button to allow all changes to take effect
      * */
      setTimeout(() => {
        expect(EventWrapper.state('extended')).toBe(true);
        expect(detailsButton.text()).toBe('Hide Details');

        expect(EventWrapper.find('div.details')).toHaveLength(1);

        expect(EventWrapper.find('a.link')).toHaveLength(1);
        expect(EventWrapper.find('a.link').prop('href')).toBe(event.htmlLink);

        expect(EventWrapper.find('p.description')).toHaveLength(1);
        expect(EventWrapper.find('p.description').text()).
            toBe(event.description);
      }, 500);
    });

    test('collapses when Hide Details button is clicked', () => {
      EventWrapper.setState({extended: true});

      const detailsButton = EventWrapper.find('button.details-button');
      detailsButton.simulate('click');

      expect(EventWrapper.state('extended')).toBe(false);
    });
  });
});