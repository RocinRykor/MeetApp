import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import {getEvents, extractLocations, checkToken, getAccessToken} from
      './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = !(await checkToken(accessToken)).error;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({showWelcomeScreen: !(code || isTokenValid)});
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({events, locations: extractLocations(events)});
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location = this.state.location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
          location === 'all'
              ? events
              : events.filter((event) => event.location === location);

      const eventsToDisplay = eventCount || this.state.numberOfEvents;
      const slicedEvents =
          locationEvents.length === 0
              ? events.slice(0, eventsToDisplay)
              : locationEvents.slice(0, eventsToDisplay);

      this.setState({
        events: slicedEvents,
        location: location,
      });
    });
  };

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
        className="App"/>;

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
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                         getAccessToken={() => { getAccessToken(); }}/>
        </div>
    );
  }
}

export default App;