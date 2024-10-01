# AngularEventify

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Overview

The Event Calendar is an Angular component that provides a user-friendly interface for managing and visualizing events. It allows users to create, read, update, and delete events while offering customization options for event appearance and a drag-and-drop functionality for flexible scheduling.

## Features

- Weekly View Display events in a weekly format, giving users a clear overview of their schedule.
- CRUD Operations: Easily create, read, update, and delete events.
- Customizable Themes: Users can define a custom theme by passing colors from the parent component to style event objects.
- Event Background Color: Set a specific background color for each event to visually differentiate them.
- Drag and Drop: Move events within the calendar to reschedule them. Events snap to the nearest time slot, but can move freely across different days (columns).

## Installation

Clone the repository:
```sh
 git clone https://github.com/johannesMatevosyan/AngularEventify
```
Navigate to the project directory:

```sh
cd your-project-directory
```
Install dependencies:

```sh
npm install
```

## Usage
Import the Event Calendar component into your Angular project:
```sh
 import { EventCalendarComponent } from 'your-calendar-path';
```

Include the component in your template:
```sh
 <ae-eventify [events]="events" [theme]="theme"></ae-eventify>
```

Pass in your list of events 
```sh
 events = [
  {
    id: 1,
    name: 'Meeting',
    date: '2024-09-01',
    startTime: '09:00',
    endTime: '10:00',
    description: 'Plan the marketing strategy for the upcoming quarter.'
  },
  // More events...
];
```

## Configuration
### Inputs

- **events**: An array of event objects, each containing:
    - **id**: Unique identifier for the event.
    - **name**: The name of the event
    - **startTime**: Start time in ISO 8601 format or 24-hour time format (`HH:mm`), e.g., '09:00', '14:00', '18:30'.
    - **endTime**: Start time in ISO 8601 format or 24-hour time format (`HH:mm`), e.g., '09:00', '14:00', '18:30'.
    - **date**: Date
    - **description**: Brief description of an event(150 characters max.)
    
## Form Validation Rules Set

When creating or updating an event, the following validation rules must be met:

- **Name**: The event name is required. It cannot be left empty.
- **Start Time**: The event start time is required and must be specified.
- **End Time**: The event end time is required and must be specified.
- **Same Day Rule**: The start and end dates must be within the same day. Events that span across multiple days are not supported.
- **Time Range**: Events can only be scheduled between 6:00 AM and 7:00 PM. If the specified time is outside this range, it will be adjusted to the last available time slot of the day.

## Time Format Switching
Event calendar provides the flexibility to display time in both continental (24-hour) and 12-hour (AM/PM) formats. By default 24-hour system is set event calendar component.
This allows users to customize the display according to their preferred time format. 

Key Features:
24-hour format: Display time in the common continental format, e.g., 13:00 for 1:00 PM.
12-hour format: Switch to AM/PM time format, e.g., 1:00 PM.
Example Usage:
You can easily toggle between the time formats via the settings or configuration options by adding `isAmPmFormat` input and set to `true`


```sh
  // Example configuration for 12-hour (AM/PM) format
  <ae-eventify [isAmPmFormat]="true"></ae-eventify>

```

You can specify the desired time format when initializing the calendar, ensuring the events are displayed in the format that best suits your needs.

## Disable Right-Click on Event Box

Users can disable the right-click functionality on event boxes within the calendar component to prevent unwanted actions. This can be useful for improving user experience by limiting interactions to left-click actions only.

```sh
  // Example configuration to diable right click event
  <ae-eventify [disableRightClick]="true"></ae-eventify>

```

## Event reminder

### Configuring Event Reminder Functionality

The event reminder feature enables alerts for upcoming events. You can configure it from the parent component by updating the **`showReminderData`** object.

### `showReminderData` Object Properties:

- **`showEventReminder`** (`boolean`):  Determines whether the event reminder functionality is enabled.
  - Default: `false`.
  - To enable, set this to `true`.

- **`showBeforeMinutes`** (`number`):  Specifies how many minutes before the event the reminder will be shown. This property only accepts two values:
  - **Accepted values**: `30` or `60`.
  - Default: `30`.

### Example Usage:

You can configure the reminder functionality in the parent component like this:

```sh
  <ae-eventify 
    [showReminderData]="{
        showEventReminder: true,  // Enables the reminder functionality
        showBeforeMinutes: 60     // Shows the reminder 60 minutes before the event
  }"></ae-eventify>

```

### How It Works:

Once the reminder feature is enabled:
- The application checks the current time against the event start time and triggers an alert **within a 5-minute window** around the configured reminder time (30 or 60 minutes before the event).

### Note:
- ***showEventReminder:*** If this is set to false, the reminder feature will be disabled and no alerts will be shown.
- ***showBeforeMinutes:*** If an invalid value is provided (anything other than 30 or 60), the default value of 30 minutes will be used. 

## Event Emission Features

Library provides robust event emission features to handle various scenarios, including event creation, updates, deletion, and error handling.

### Event Creation and Update
When a new event is successfully created (either by clicking a time slot or using the "Add Event" button), 
the library emits an event containing the data of the newly created event. Moreover, the library also emits an event when an existing event is successfully updated. 
Example emitted data:

```sh
  {
    "id": "55",
    "name": "Meeting with Team",
    "startTime": "10:00",
    "endTime": "11:00",
    "date": "2024-10-03"
    "description": "Discuss new changes",
  }

```

### Event Deletion
When an event is successfully deleted, the library emits an event containing details of the deleted event (e.g., event ID or name). Emmited data example.

```sh
  {
    "eventId": "8487",
    "name": "UI Meetup",
  }

```

### Error Handling
If an error occurs during event creation, update, or deletion, the library emits an error message with a description of the issue.

```sh
  {
    "error": "Request failed. Please try again later.",
  }

```

### Event Listeners
The parent component can listen to the following emitted events:

`eventCreated`: Triggered when a new event is successfully created.
`eventUpdated`: Triggered when an event is successfully updated.
`eventDeleted`: Triggered when an event is successfully deleted.
`eventCreationFailed`, `eventUpdateFailed`, `eventDeletionFailed`: Triggered in case of failure during event creation, update, or deletion, respectively.

Example Usage:
```sh
  <ae-eventify  
    (eventCreated)="onEventCreated($event)" 
    (eventUpdated)="onEventUpdated($event)" 
    (eventDeleted)="onEventDeleted($event)" 
    (eventCreationFailed)="onEventCreationFailed($event)" 
    (eventUpdateFailed)="onEventUpdateFailed($event)" 
    (eventDeletionFailed)="onEventDeletionFailed($event)"></ae-eventify>

```

In this way, you can handle all emitted events and errors in your parent component.

## Custom CSS Class Support

The `AngularEventify` allows users to pass a custom CSS class, providing flexibility for styling the calendar as per their design preferences. 
By passing a custom class, users can override or extend the default styles of the calendar component without modifying its core styles. To apply a custom class, pass it as an input property to the calendar component:

```sh
  <ae-eventify [customClass]="myCustomClass"></ae-eventify>

```

### Accessibility Features

The calendar component has been enhanced with several accessibility features to ensure a more inclusive user experience:

- **ARIA Attributes**: Added `aria-label`, `aria-live`, `aria-describedby`, and `role` attributes to improve screen reader support and provide better context for users with disabilities.
- **Table Accessibility**: Implemented `scope="row"` and `scope="col"` attributes for the table headers to enhance navigation and understanding of the table structure for screen readers.
- **Keyboard Navigation**: Added `tabindex` property to form elements and buttons, allowing users to access all interactive elements using the keyboard alone.

These improvements aim to make the application more accessible and user-friendly for individuals using assistive technologies.

## Event Creation

The event calendar library allows users to create new events effortlessly in two ways:

### Clicking on a Time Slot:
By clicking directly on any time slot (cell) rendered in the calendar view, a modal dialog will open. This dialog contains a form to create a new event. The start time of the event will automatically be set to the date and time of the clicked slot, although you can modify this before saving the event.

### Using the 'Add Event' Button:
Alternatively, you can create a new event by clicking the 'Add Event' button located in the navigation menu. In this case, the modal dialog will open with the current date and time as the default start time, which can also be changed.

### Time Slot Restrictions
Events can only be created within time slots ranging from 6:00 AM to 7:00 PM. If an attempt is made to create an event outside of this time range, the event will be assigned the last available time slot of the current date.

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [HTML and CSS Techniques to Ensure Your Website is Accessible to Everyone](https://beaccessible.com/post/html-css-accessibility/)
* [WAI-ARIA basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)
* [aria-label](https://www.aditus.io/aria/aria-label/)
* [CSS Can Influence Screenreaders](https://benmyers.dev/blog/css-can-influence-screenreaders/)
* [Accessibility and HTML](https://www.codecademy.com/article/accessibility-and-html)

## License
This project is licensed under the MIT License. See the LICENSE file for more details.



