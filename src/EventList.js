import React, {Component} from 'react';
import Event from './Event';
import {WarningAlert} from './Alert';

class EventList extends Component {
  render() {
    const {events} = this.props;
    const online = navigator.onLine;
    return (
        <div>
          <div>
            <h2>Events</h2>
            {/* Display warning message if app is offline */}
            {!online && <WarningAlert
                text="You're currently using the app offline. These events might not be up to date."></WarningAlert>}
          </div>
          <ul className={'EventList'}>
            {events.map(event =>
                <li key={event.id}>
                  <Event event={event}/>
                </li>,
            )}
          </ul>
        </div>
    );
  }
}

export default EventList;