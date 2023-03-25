import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import {getEvents, extractLocations} from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.numberOfEvents);
        this.setState({events, locations: extractLocations(events)});
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
          location === 'all'
              ? events
              : events.filter((event) => event.location === location);

      const eventsToDisplay = eventCount || this.state.numberOfEvents;
      const slicedEvents = locationEvents.length === 0 ? events.slice(0,
          eventsToDisplay) : locationEvents.slice(0, eventsToDisplay);

      this.setState({
        events: slicedEvents,
      });
    });
  };

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }

  render() {
    return (
        <div className="App">
          <CitySearch locations={this.state.locations}
                      updateEvents={this.updateEvents}/>
          <NumberOfEvents
              eventNum={this.state.numberOfEvents}
              updateNumberOfEvents={(eventNum) => this.updateNumberOfEvents(
                  eventNum)}
              updateEvents={this.updateEvents}
          />
          <EventList events={this.state.events}/>
        </div>
    );
  }
}

export default App;