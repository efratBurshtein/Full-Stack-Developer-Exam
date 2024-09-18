# Full-Stack-Developer-Exam Donation management

This repository contains a full-stack application developed as part of a software developer exam. The project demonstrates proficiency in both client-side and server-side development, focusing on implementing best practices and proper architecture. 

Please note that the application simulates database interactions; actual database operations are not performed.

## Project Overview

The application is designed to manage donations, including adding new donations, viewing a list of donations, and editing existing donations. The project involves both client-side and server-side development, with a focus on modern libraries and technologies.

## Features

### Client-Side (Frontend)

- **Add Donation**: 
  - A form for adding new donations with validation.
    
- **View Donation List**: 
  - Displays a list of donations.
    
- **Edit Donation**: 
  - Allows modification of existing donation details.

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
  - .NET Core
```
## Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/efratBurshtein/Full-Stack-Developer-Exam.git

2. **Install dependencies for the client-side:**
  ```bash
    cd client
    npm install

3.**Run the client-side application:**
    npm start

4.**set up the server-side API according to the provided guidelines (using .NET Core )**


## Add Donation
![Add Donation](./Images/Add%20Donation.png)

### View Donation
![View Donation](./Images/View%20Donation.png)

