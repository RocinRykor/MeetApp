import React, {Component} from 'react';
import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventNum: 32,
    errorText: ''
  };

  componentDidMount() {
    this.setState({eventNum: this.props.eventNum || 32});
  }

  changeEventNum(value) {
    this.setState({eventNum: value});
    this.props.updateNumberOfEvents(value);
    if (value <= 0 || value > 64) {
      this.setState({errorText: 'Invalid Input, please select a number between 1-64'})
    } else {
      this.setState({errorText: ''})
    }
  }

  render() {
    const {eventNum, errorText} = this.state;
    return (
        <div className="numberOfEvents">
          <ErrorAlert text={errorText}/>
          <h3>Number of Events:</h3>
          <input
              className="event-num-input"
              type="number"
              value={eventNum}
              onChange={event => {
                this.changeEventNum(event.target.value);
                this.props.updateEvents();
              }}
          >
          </input>
        </div>
    );
  }
}

export default NumberOfEvents;