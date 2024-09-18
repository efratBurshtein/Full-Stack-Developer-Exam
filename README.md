﻿# Full-Stack-Developer-Exam
# Full-Stack Developer Exam

This repository contains a full-stack application developed as part of a software developer exam. The project demonstrates proficiency in both client-side and server-side development, focusing on implementing best practices and proper architecture. 

Please note that the application simulates database interactions; actual database operations are not performed.

## Project Overview

The application is designed to manage donations, including adding new donations, viewing a list of donations, and editing existing donations. The project involves both client-side and server-side development, with a focus on modern libraries and technologies.

## Features

### Client-Side (Frontend)

- **Add Donation**: 
  - A form for adding new donations with validation:
    - **Name of Entity**: Allows entry in Hebrew and English only.
    - **Donation Amount**: Accepts decimal numbers only.
    - **Save Button**: Submits the form data and adds the donation to the list.

- **View Donation List**: 
  - Displays a list of donations:
    - **Name of Entity**: The name of the entity receiving the donation.
    - **Donation Amount**: The amount of the donation.
    - **Add Donation Button**: Opens the form for adding new donations.

- **Edit Donation**: 
  - Allows modification of existing donation details:
    - **Edit Button**: Transitions the form to edit mode.
    - **Update Button**: Saves the changes made to the donation details.

### Server-Side (Backend)

- **Web API**: A RESTful API for handling donation data with the following methods:
  
  - **POST Method**: 
    - Receives donation data and performs validation.
    - Simulates saving the data to a database.

  - **PUT Method**: 
    - Updates existing donation details.
    - Simulates updating the data in a database.

  - **DELETE Method**: 
    - Deletes specified donations from the system.
    - Simulates removing the data from a database.

  - **Send Email**: 
    - Sends an email notification when a donation exceeds 10,000 NIS.
    - Configurable to use an email service of choice.

## Technologies Used

- **Client-Side**: 
  - React
  - TypeScript
  - CSS
  - Material-UI (MUI) library for styling

- **Server-Side**: 
  - .NET Core or .NET Framework for API development

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/efratBurshtein/Full-Stack-Developer-Exam.git
