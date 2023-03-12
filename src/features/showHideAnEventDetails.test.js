import {defineFeature, loadFeature} from 'jest-cucumber';
import {mount} from 'enzyme';
import App from '../App';
import React from 'react';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
defineFeature(feature, test => {
  let AppWrapper;

  test('An event element is collapsed by default', ({given, when, then}) => {
    given('The user has not interacted with an event', () => {

    });

    when('The element is loaded', () => {
      AppWrapper = mount(<App/>);
    });

    then('Collapse the details of the event by default', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({given, when, then}) => {
    given('The element data has loaded', () => {
      AppWrapper = mount(<App/>);
    });

    when('The user interacts with the event element', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    then('Expand the element to show more details of the event to the user',
        () => {
          expect(AppWrapper.find('.event .details')).toHaveLength(1);
        });
  });

  test('User can collapse an event to hide its details',
      ({given, when, then}) => {
        given(
            'The element has loaded and the user has interacted with it to expand its details',
            async () => {
              AppWrapper = await mount(<App/>);
              AppWrapper.update();
              AppWrapper.find('.event .details-btn').at(0).simulate('click');
            });

        when('The user selects a “collapse” button within the element', () => {
          AppWrapper.update();
          AppWrapper.find('.event .details-btn').at(0).simulate('click');
        });

        then('Return the element to the collapsed state', () => {
          expect(AppWrapper.find('.event .details')).toHaveLength(0);
        });
      });
});