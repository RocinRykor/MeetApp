import {defineFeature, loadFeature} from 'jest-cucumber';
import {mount} from 'enzyme';
import App from '../App';
import React from 'react';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
defineFeature(feature, test => {

  let AppWrapper;
  test('When user hasn’t specified a number, 32 is the default number',
      ({given, when, then}) => {
        given('The user has not specified an amount of events to view per page',
            () => {

            });

        when('The search results are returned', () => {
          AppWrapper = mount(<App/>);
        });

        then(
            /^Show up to (\d+) events at one time, with an option to view more \(the next block of (\d+)\) as needed$/,
            (arg0, arg1) => {
              expect(AppWrapper.state('numberOfEvents')).toEqual(32);
            });
      });

  test('User can change the number of events they want to see',
      ({given, when, then}) => {
        given('The user performs a search of events', async () => {
          AppWrapper = await mount(<App/>);
        });

        when(
            'The user selects, from a list of possible options, how many events they wish to see at once',
            () => {
              AppWrapper.update();
              let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
              const eventObject = {target: {value: 2}};
              NumberOfEventsWrapper.find('.event-num-input').simulate(
                  'change',
                  eventObject,
              );
            });

        then(
            'Up to that amount of events will be displayed at once, with an option to view more (the next block of search results) as needed',
            () => {
              expect(AppWrapper.find('.event')).toHaveLength(2);
            });
      });

});