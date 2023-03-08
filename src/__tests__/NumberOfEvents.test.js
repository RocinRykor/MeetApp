import React, {Component} from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents />', () => {

  let NumberOfEventsWrapper, eventNumInput;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
        <NumberOfEvents updateNumberOfEvents={() => {}}/>,
    );
    eventNumInput = NumberOfEventsWrapper.find('input.event-num-input');
  });

  test('Renders basic component and eventNum Input', () => {
    expect(NumberOfEventsWrapper).toBeDefined();
    expect(eventNumInput).toBeDefined();
  });

  test('eventNum-Input defaults to 32', () => {
    expect(eventNumInput.prop('type')).toBe(`number`);
    expect(NumberOfEventsWrapper.state('eventNum')).toBe(32);
  });

  test('the input should have the value given in the num prop', () => {
    const NumberOfEventsWrapperWithProp = shallow(
        <NumberOfEvents eventNum={20} updateNumberOfEvents={() => {}}/>,
    );
    expect(NumberOfEventsWrapperWithProp.state('eventNum')).toBe(20);
  });

  test('eventNum-Input is changed to 64 and the value is reflected correctly',
      () => {
        expect(NumberOfEventsWrapper.state('eventNum')).toBe(32);
        eventNumInput.simulate('change', {
          target: {value: 64},
        });
        expect(NumberOfEventsWrapper.state('eventNum')).toBe(64);
      });

});