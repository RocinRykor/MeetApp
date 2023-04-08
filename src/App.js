import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import {getEvents, extractLocations, checkToken, getAccessToken} from
      './api';
import './nprogress.css';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EventGenre from './EventGenre';

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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
          (event) => event.location === location).length;
      const city = location.split(', ').shift();
      return {city, number};
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
        className="App"/>;

    const {locations, numberOfEvents, events} = this.state;

    return (
        <div className="App">
          <h1 className={'title'}>Welcome To Meet!</h1>
          <div className={'filters'}>
            <CitySearch locations={locations}
                        updateEvents={this.updateEvents}/>
            <NumberOfEvents
                eventNum={numberOfEvents}
                updateNumberOfEvents={(eventNum) => this.updateNumberOfEvents(
                    eventNum)}
                updateEvents={this.updateEvents}
            />
          </div>
          <h2 className={'label'}>Events in each city</h2>

          <div className={'data-vis-wrapper'}>
            <EventGenre events={events}/>
            <ResponsiveContainer height={400}>
              <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <CartesianGrid/>
                <XAxis type="category" dataKey="city" name="City"/>
                <YAxis
                    allowDecimals={false}
                    type="number"
                    dataKey="number"
                    name="Number of Events"
                />
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Scatter data={this.getData()} fill="#8884d8"/>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <EventList events={events}/>
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                         getAccessToken={() => { getAccessToken(); }}/>
        </div>
    );
  }
}

export default App;