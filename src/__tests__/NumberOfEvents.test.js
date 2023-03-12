import React, {Component} from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents />', () => {

  let NumberOfEventsWrapper, numberOfEventsInput;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents/>);
    numberOfEventsInput = NumberOfEventsWrapper.find('input.event-num-input');
  });

  test('Renders basic component and numberOfEvents Input', () => {
    expect(NumberOfEventsWrapper).toBeDefined();
    expect(numberOfEventsInput).toBeDefined();
  });

  test('numberOfEvents-Input defaults to 32', () => {
    expect(numberOfEventsInput.prop('type')).toBe(`number`);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });

  test('numberOfEvents-Input is changed to 64 and the value is reflected correctly',
      () => {
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
        numberOfEventsInput.simulate('change', {
          target: {value: 64},
        });
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(64);
      });

});