Feature: As a user, I should be able to show or hide an event’s details so that I can quickly skim events while being able to focus on the particular ones that interest me.

  Scenario: An event element is collapsed by default
    Given The user has not interacted with an event
    When The element is loaded
    Then Collapse the details of the event by default

  Scenario: User can expand an event to see its details
    Given The element data has loaded
    When The user interacts with the event element
    Then Expand the element to show more details of the event to the user

  Scenario: User can collapse an event to hide its details
    Given The element has loaded and the user has interacted with it to expand its details
    When The user selects a “collapse” button within the element
    Then Return the element to the collapsed state