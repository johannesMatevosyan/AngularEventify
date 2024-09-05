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
 <app-calendar [events]="events" [theme]="theme"></app-calendar>
```

Pass in your list of events 
```sh
 events = [
  {
    id: 1,
    title: 'Meeting',
    startTime: '2024-09-01T09:00',
    endTime: '2024-09-01T10:00',
    backgroundColor: '#ff0000',
  },
  // More events...
];
```

## Configuration
### Inputs

- **events**: An array of event objects, each containing:
    - **id**: Unique identifier for the event.
    - **title**: The title of the event.
    - **startTime**: Start time in ISO 8601 format.
    - **endTime**: Start time in ISO 8601 format.
    - **date**: Date
    - **description**: Brief description of an event(150 characters max.)

## Outputs
- **eventAdded**: Emits an event object when a new event is added.
- **eventUpdated**: Emits an event object when an event is updated.
- **eventDeleted**: Emits the event ID when an event is deleted.

## Time Format Switching
Event calendar provides the flexibility to display time in both continental (24-hour) and 12-hour (AM/PM) formats. 
This allows users to customize the display according to their preferred time format.

Key Features:
24-hour format: Display time in the common continental format, e.g., 13:00 for 1:00 PM.
12-hour format: Switch to AM/PM time format, e.g., 1:00 PM.
Example Usage:
You can easily toggle between the time formats via the settings or configuration options by modifying `timeFormat` option:


```sh
  // Example configuration for 24-hour format
  <app-calendar [isAmPmFormat]="'24-hour'"></app-calendar>

  // Example configuration for 12-hour (AM/PM) format
  <app-calendar [isAmPmFormat]="'12-hour'"></app-calendar>

```

You can specify the desired time format when initializing the calendar, ensuring the events are displayed in the format that best suits your needs.

## Development
To run the project locally:
```sh
 ng serve
```
Open your browser and navigate to http://localhost:4200/

## License
This project is licensed under the MIT License. See the LICENSE file for more details.



