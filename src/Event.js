import React, {Component} from 'react';

class Event extends Component {

  render() {
    const {event} = this.props;

    return <div className={'Event'}>
      <h1 className="summary">
        {event.summary}
      </h1>
      <h2 className={'location'}>{event.location}</h2>
      <h2 className={'start-time'}>{event.start.dateTime}</h2>
    </div>;
  }
}

export default Event;