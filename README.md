<<<<<<< HEAD

# Contact Management and COVID-19 Dashboard App

This web application allows users to manage contacts and view COVID-19 data globally and by country.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the App](#running-the-app)
- [Contact Management](#contact-management)
- [COVID-19 Dashboard](#covid-19-dashboard)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

Before running the app, ensure you have the following prerequisites installed:

- **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/YourUsername/contact-covid-app.git
   ```

2. Navigate to the project directory:

```bash
  cd contact-covid-app
```

3. Install the project dependencies:

```bash
npm install
```

## Running the App

To run the app locally, follow these steps:

1. Start the development server:

```bash
npm start
```

2. Open your web browser and access the app at http://localhost:3000.

## Contact Management

Contact Management
The "Contact Management" feature allows you to:

- Add new contacts with a first name, last name, email, and status (Active/Inactive).
- Edit existing contacts.
- Delete contacts.
- View contact details.

## COVID-19 Dashboard

The "COVID-19 Dashboard" feature allows you to:

- View global COVID-19 statistics, including total cases, active cases, recoveries, and deaths.
- View COVID-19 statistics for individual countries.
- Click on map markers to see country-specific COVID-19 data.

## API Endpoints

This app uses the following API endpoints:

- COVID-19 World Data: https://disease.sh/v3/covid-19/all
- Country-Specific COVID-19 Data: https://disease.sh/v3/covid-19/countries
  These endpoints provide real-time data on COVID-19 cases, recoveries, and deaths.

## Technologies Used

- React.js
- Axios
- React-Leaflet
- Bootstrap
- Node.js
- React Router
- React Router DOM
