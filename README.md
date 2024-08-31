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
 <app-event-calendar [events]="events" [theme]="theme"></app-event-calendar>
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

## Development
To run the project locally:
```sh
 ng serve
```
Open your browser and navigate to http://localhost:4200/

## License
This project is licensed under the MIT License. See the LICENSE file for more details.



