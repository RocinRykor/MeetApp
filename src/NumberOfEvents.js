import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {eventNum: 32}

  componentDidMount() {
    this.setState({ eventNum: this.props.eventNum || 32 });
  }

  changeEventNum(value) {
    this.setState({ eventNum: value })
  }

  render() {
    const {eventNum} = this.state
    return (
    <div className="numberOfEvents">
        <h3>Number of Events:</h3>
        <input
          className="event-num-input"
          type="number"
          value={eventNum}
          onChange={event => {
            this.changeEventNum(event.target.value);
          }}
        >
        </input>
    </div>
    )
  }
}

export default NumberOfEvents;