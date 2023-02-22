# MeetApp
Search and view upcoming events in your area.

## Key Features:
+ Filter Events by city
+ Show/Hide event details
+ Specify a number of events
+ Use the app offline
+ Add an app shortcut to the home-screen
+ View a chart showing the number of upcoming events by city

## User Stories and Scenarios
### Feature 2: As a user, I should be able to show or hide an event’s details so that I can quickly skim events while being able to focus on the particular ones that interest me.
#### Scenario 1: An event element is collapsed by default
##### Given: The user has not interacted with an event 
##### When: The element is loaded
##### Then: Collapse the details of the event by default
#### Scenario 2: User can expand an event to see its details
##### Given: The element data has loaded
##### When: The user interacts with the event element
##### Then: Expand the element to show more details of the event to the user
#### Scenario 3: User can collapse an event to hide its details
##### Given: The element has loaded and the user has interacted with it to expand its details
##### When: The user selects a “collapse” button within the element
##### Then: Return the element to the collapsed state
### Feature 3: As a user, I should be able to specify a number of events to view so that I can choose how many events I wish to see and search through at a given moment.
#### Scenario 1: When user hasn’t specified a number, 32 is the default number
##### Given: The user has not specified an amount of events to view per page
##### When: The search results are returned
##### Then: Show up to 32 events at one time, with an option to view more (the next block of 32) as needed
#### Scenario 2: User can change the number of events they want to see
##### Given: The user performs a search of events
##### When: The user selects, from a list of possible options, how many events they wish to see at once
##### Then: Up to that amount of events will be displayed at once, with an option to view more (the next block of search results) as needed
### Feature 4: As a user, I should be able to use the app offline so that I am not interrupted by network hiccups.
#### Scenario 1: Show cached data when there’s no internet connection
##### Given: The user has previously loaded the app, with an internet connection, and was able to cache event data
##### When: The user loads the app without an (or loses) internet connection
##### Then: Return searches results based on the cached data (with a warning that there is no internet connection)
#### Scenario 2: Show error when user changes the settings (city, time range)
##### Given: The app does not have internet connection and is using cached data
##### When: The user changes search settings that would not be compatible with the cached settings (such as a different city or a time range that falls outside of the cached data)
##### Then: Return a error message to the user that explains that without an internet connection they cannot change their current search settings
### Feature 5: As a user, I should be able to visualize data within the app so that I can have a quick overview of what events are available to me.
#### Scenario 1: Show a chart with the number of upcoming events in each city
##### Given: The search results have returned
##### When: The user selects an option to “visualize” the search results
##### Then: A chart with the appropriate metrics, based on the search, will be displayed to the user
