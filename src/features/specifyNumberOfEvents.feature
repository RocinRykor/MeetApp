Feature: As a user, I should be able to specify a number of events to view so that I can choose how many events I wish to see and search through at a given moment.

  Scenario: When user hasn’t specified a number, 32 is the default number
    Given The user has not specified an amount of events to view per page
    When The search results are returned
    Then Show up to 32 events at one time, with an option to view more (the next block of 32) as needed

  Scenario: User can change the number of events they want to see
    Given The user performs a search of events
    When The user selects, from a list of possible options, how many events they wish to see at once
    Then Up to that amount of events will be displayed at once, with an option to view more (the next block of search results) as needed