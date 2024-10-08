# AngularEventify

## Overview
AngularEventify is a comprehensive event scheduling library designed to seamlessly integrate with Angular applications. It offers an array of powerful customization options, making it easy for developers to create dynamic, user-friendly event calendars. With support for flexible time formats, custom theming, and backend integration, AngularEventify provides all the essential tools you need for managing and displaying events effectively.

Whether you're developing a simple scheduling tool or a complex event management system, AngularEventify’s customizable features ensure that your calendar fits perfectly with your application's design and functionality.

## Key Features

-  **Weekly View**: Display events in a weekly format, giving users a clear overview of their schedule.
-  **CRUD Operations**: Easily create, read, update, and delete events.
-  **Custom Themes and Styles**: Set a custom theme for the entire page, with options to apply custom styles to event boxes, making it easy to tailor the look and feel to your application's design.
-  **Time Format Flexibility**: Seamlessly switch between 12-hour (AM/PM) and 24-hour time formats to meet different user preferences.
-  **Disable Right-Click**: Disable right-click functionality on event boxes to prevent unwanted interactions.
-  **Event Reminders**: Show reminders for upcoming events, helping users stay on top of their schedules.
-  **Disallow Past Event Creation**: Prevent users from creating events in past dates, ensuring data consistency and avoiding mistakes.
-  **Backend Integration**: Easily configure backend URLs to handle event requests and responses, streamlining integration with your API.
-  **Event Response Handling**: Emit responses for both success and error cases when handling event requests, making it easier to handle API interactions.
-  **Custom CSS Classes**: Apply custom CSS classes to event boxes for more granular control over the styling of individual events.

With AngularEventify, you'll have everything you need to build an event scheduling application that is both user-friendly and feature-rich.

## Installation

To install the package via npm, run the following command:

```sh
npm install angular-eventify
```

or 

```sh
yarn add angular-eventify
```

## Usage
Import the styles file your Angular project:

```sh
 import 'angular-eventify/dist/style.css'
```

Include the component in your template:
```sh
 <ae-eventify></ae-eventify>
```

## Configuration

### Configuring URLs

The `urlData` input property allows you to specify the URLs required for sending data via HTTP requests in your event scheduler. By providing an object with the following properties, you can easily configure your API endpoints:

- **baseUrl**: The main URL string used as the foundation for all event-related requests. 
- **getUrl**: The endpoint for retrieving events (default: /events). 
- **addUrl**: The endpoint for adding new events (default: /events). 
- **updateUrl**: The endpoint for updating existing events (default: /events). 
- **deleteUrl**: The endpoint for deleting events (default: /events). 

This configuration enables seamless integration with your backend services, ensuring that your event management operations are efficient and straightforward.

### Example Usage:

```sh
  <ae-eventify  
    baseUrl: 'path-to-your-api-data',
    getUrl: '/events',
    addUrl: '/events',
    updateUrl: '/events',
    deleteUrl: '/events'
  ></ae-eventify>

```

### Event object

Each event object in AngularEventify contains key properties that define the event details. 
These properties provide all the necessary information to manage and display events within the calendar effectively.


  - **id**: Unique identifier for the event.
  - **name**: The name of the event
  - **startTime**: Start time in ISO 8601 format or 24-hour time format (`HH:mm`), e.g., '09:00', '14:00', '18:30'.
  - **endTime**: Start time in ISO 8601 format or 24-hour time format (`HH:mm`), e.g., '09:00', '14:00', '18:30'.
  - **date**: Date
  - **description**: Brief description of an event(150 characters max.)


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

### Example Usage:

```sh
  <ae-eventify  
    (eventCreated)="onEventCreated($event)" 
    (eventUpdated)="onEventUpdated($event)" 
    (eventDeleted)="onEventDeleted($event)" 
    (eventCreationFailed)="onEventCreationFailed($event)" 
    (eventUpdateFailed)="onEventUpdateFailed($event)" 
    (eventDeletionFailed)="onEventDeletionFailed($event)">
  </ae-eventify>

```

In this way, you can handle all emitted events and errors in your parent component.

## Form Validation Rules Set

When creating or updating an event, the following validation rules must be met:

- **Name**: The event name is required. It cannot be left empty.
- **Start Time**: The event start time is required and must be specified.
- **End Time**: The event end time is required and must be specified.
- **Same Day Rule**: The start and end dates must be within the same day. Events that span across multiple days are not supported.
- **Time Range**: Events can only be scheduled between **6:00 AM** and **6:30 PM**. If the specified time is outside this range, it will be adjusted to the last available time slot of the day.

## Time Format Switching
Event calendar provides the flexibility to display time in both continental (24-hour) and 12-hour (AM/PM) formats. By default 24-hour system is set event calendar component.
This allows users to customize the display according to their preferred time format. 

Key Features:
24-hour format: Display time in the common continental format, e.g., 13:00 for 1:00 PM.
12-hour format: Switch to AM/PM time format, e.g., 1:00 PM.

### Example Usage:

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

## Disallow users from adding new events to past dates

The `disallowPastDates` feature in the event calendar component allows you to prevent users from adding events on past dates. When this option is enabled, dates before the current date are automatically disabled in the date picker, and any attempt to add an event to a past date will be restricted.

### Key Benefits:
- ***Improved User Experience:*** Users can only schedule events for today or future dates, avoiding confusion or invalid data entry.
- ***Built-in Validation:*** No need for additional logic to validate past dates; this feature ensures consistent behavior throughout the calendar. 
- ***Seamless Integration:*** Works directly with the date selection inputs (e.g., via Flatpickr) and event scheduling forms, making it easy to manage date restrictions. 

### How to Use:

**Enable** `disallowPastDates` **in the Component**: To enable the feature, set the disallowPastDates boolean property to true in the calendar component’s configuration:

>```sh
>  <ae-eventify [disallowPastDates]="true"></ae-eventify>
>```

**Automatic Date Picker Integration**: When enabled, the date picker (configured with Flatpickr) will automatically disable past dates. You don’t need to write additional logic to prevent users from selecting past dates.

**Alert Message for Past Dates**: If the user clicks on a time slot that belongs to a past date, an alert window will appear with the following message:

> ```sh
> You cannot add an event to a past date.
> ```


This helps guide users and prevent them from mistakenly trying to schedule events on dates that have already passed.

#### Example
If the current date is **October 5, 2024**, any date before this will be disabled for selection, and attempting to create events on those dates will not be allowed. Additionally, clicking a time slot from a past date will trigger an alert notifying the user that past events cannot be added.

## Custom Theming with schedulerUI

The schedulerUI input property allows you to create a fully customizable theme for the event scheduler. By passing an object with the following properties, you can easily tailor the appearance of the scheduler to match your application’s design:

**schedulerBackColor**: Sets the background color of the entire scheduler.
**schedulerFontColor**: Defines the font color used throughout the scheduler.
**cellColor**: Specifies the color of individual time cells in the scheduler grid.
**currentDayColor**: Highlights the current day with a specific color for easy identification.
**currentTimeBarColor**: Sets the color of the current time bar, which visually indicates the present time on the scheduler.
**navigationColor**: Customizes the color of the navigation controls (e.g., next/previous buttons, column headers).

This flexibility allows you to apply a unique visual style to your scheduler, ensuring it blends perfectly with your overall theme.

```sh
  <ae-eventify 
    [schedulerUI]="{
      schedulerBackColor: '#ff0000',
      schedulerFontColor: '#000000',
      cellColor: '#eeeeee',
      currentDayColor: 'blue',
      currentTimeBarColor: 'orange',
      navigationColor: 'green',
    }"></ae-eventify>

```

You can set both hex color codes and color names (e.g., red, green) for each property, providing flexibility in how you define your custom theme. This allows for easy integration of your preferred color scheme.

## Customizing Event Appearance with `eventUI`

The eventUI input property allows you to customize the appearance of individual events within the scheduler. By passing an object with the following properties, you can tailor the look and feel of your event boxes:

**eventBackColor**: Sets the background color of the event boxes.
**eventHoverColor**: Defines the background color when the user hovers over an event box, enhancing user interactivity.
**eventBorderColor**: Specifies the color of the border surrounding each event box.
**eventFontColor**: Sets the font color used within the event boxes for better visibility and aesthetics.

### Example Usage:

You can configure the reminder appearance of events like this:

```sh
  <ae-eventify 
    [eventUI]="{
      eventBackColor: 'orange',
      eventHoverColor: '#eeeeee',
      eventBorderColor: 'black',
      eventFontColor: 'black'
    }"></ae-eventify>

```

## Custom CSS Class Support

The `AngularEventify` allows users to pass a custom CSS class, providing flexibility for styling the calendar as per their design preferences. 
By passing a custom class, users can override or extend the default styles of the calendar component without modifying its core styles. To apply a custom class, pass it as an input property to the calendar component:

```sh
  <ae-eventify [customClass]="myCustomClass"></ae-eventify>

```

## Event Creation

The event calendar library allows users to create new events effortlessly in two ways:

### Clicking on a Time Slot:
By clicking directly on any time slot (cell) rendered in the calendar view, a modal dialog will open. This dialog contains a form to create a new event. The start time of the event will automatically be set to the date and time of the clicked slot, although you can modify this before saving the event.

### Using the 'Add Event' Button:
Alternatively, you can create a new event by clicking the 'Add Event' button located in the navigation menu. In this case, the modal dialog will open with the current date and time as the default start time, which can also be changed.

### Time Slot Restrictions
Events can only be created within time slots ranging from **6:00 AM** to **18:30 PM**. If an attempt is made to create an event outside of this time range, the event will be assigned the last available time slot of the current date.


### Accessibility Features

The calendar component has been enhanced with several accessibility features to ensure a more inclusive user experience:

- **ARIA Attributes**: Added `aria-label`, `aria-live`, `aria-describedby`, and `role` attributes to improve screen reader support and provide better context for users with disabilities.
- **Table Accessibility**: Implemented `scope="row"` and `scope="col"` attributes for the table headers to enhance navigation and understanding of the table structure for screen readers.
- **Keyboard Navigation**: Added `tabindex` property to form elements and buttons, allowing users to access all interactive elements using the keyboard alone.

These improvements aim to make the application more accessible and user-friendly for individuals using assistive technologies.

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [HTML and CSS Techniques to Ensure Your Website is Accessible to Everyone](https://beaccessible.com/post/html-css-accessibility/)
* [WAI-ARIA basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)
* [aria-label](https://www.aditus.io/aria/aria-label/)
* [CSS Can Influence Screenreaders](https://benmyers.dev/blog/css-can-influence-screenreaders/)
* [Accessibility and HTML](https://www.codecademy.com/article/accessibility-and-html)

## License
This project is licensed under the MIT License. See the LICENSE file for more details.



