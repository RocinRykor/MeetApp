import React, {Component} from 'react';

class Event extends Component {
  state = {extended: false};
  handleClick = () => {
    this.setState((prevState) => ({
      extended: !prevState.extended,
    }));

  };

  render() {
    const {event} = this.props;
    const {extended} = this.state;

    return <div className={'Event'}>
      <h1 className="summary">
        {event.summary}
      </h1>
      <h2 className={'location'}>{event.location}</h2>
      <h2 className={'start-time'}>{event.start.dateTime}</h2>
      <button
          className={'details-button'}
          onClick={() => this.handleClick()}>
        {extended ? 'Hide' : 'Show'} Details
      </button>
      {extended && (
          <div className='details'>
            <h2>
              More Details:
            </h2>
            <a
              className='link'
              href={event.htmlLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              View Event Details on Google Calendar
            </a>
            <p className='description'>
              {event.description}
            </p>
          </div>
        )}
    </div>;
  }
}

export default Event;