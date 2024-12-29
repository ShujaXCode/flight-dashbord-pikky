# Flight Management Dashboard

A flight management dashboard built with **React** and **Next.js**, enabling users to view and update flight statuses in real-time, along with filtering and management features.

## Features

- **Flight List**: Displays a table with flight information like flight number, origin, destination, status, and departure time.
- **Filter Flights**: Filter flights by flight number, origin, destination, and status (e.g., Scheduled, Delayed, Cancelled, In-flight).
- **Real-Time Status Update**: Updates flight status dynamically with real-time updates when the user changes a flight's status.
- **Authentication**: Secure login mechanism using JWT tokens to authenticate users and restrict access to the dashboard.
- **Logout Functionality**: Users can log out, which will remove the JWT token and redirect them to the login page.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Next.js**: Full-stack framework with server-side rendering (SSR) and API routes for data management.
- **MongoDB**: NoSQL database for storing flight details.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive UI development.
- **JWT Authentication**: JSON Web Tokens for handling secure user authentication.
- **REST API**: Routes to manage CRUD operations for flights and flight status updates.

## Logins credentials

- **Admin**: admin@gmail.com , 1234567890
- **Regular-User**: user@gmail.com , 1234567890



## Setup & Installation

To run the project locally, follow the steps below:

### Prerequisites

- **Node.js** (version 14+)
- **MongoDB** (Use local or MongoDB Atlas for cloud-based storage)
- **NPM** or **Yarn** for package management

### API Endpoints
**GET /api/flights:** 
Fetch a list of flights. Supports filtering by flight number, origin, destination, and status.

**POST /api/flights/start-generating:**
Trigger the process of generating flight data.

**POST /api/flights/update-status:**
Update the flight status for random flights.

**PATCH /api/flights/:id:**
Update the status of a specific flight (requires status in the body: e.g., Scheduled, Delayed, Cancelled, or In-flight).





### Folder Structure

/Src
- components/         # React components (FlightCard, StatusModal, etc.)
- models/             # Mongoose models (Flight schema)
- app/                # Next.js pages and API routes
  - api/              # API routes for flights-related operations
    - flights/        # API routes for flights
    - auth/login      # API for login
    - create-user     # API for creating new users, to create find post-man collection in root directory
    - test-db         # API to test DB connection
  - login/            # Login page
    - page.tsx        # Dashboard page
- public/             # Public assets (images, fonts, etc.)
- styles/             # Tailwind CSS and custom styles
- utils/              # Utility functions and helpers
- middleware/         # To handle authentication


## How to Use Filtering Flights
On the Dashboard page, you can filter flights based on various criteria:

1. Flight Number
- Search flights by the flight number.
2. Origin
-  Filter by the departure city/airport.
3. Destination
-  Filter by the arrival city/airport.
4. Status
-  Filter by the flight's current status, such as Scheduled, Delayed, Cancelled, or In-flight.
5. Airline
- Filter by Airline.
6.  Type
- Filter by Type of Flight.
8. Update Flight Status
- To update a flight’s status: (NOTE APPLICABLE FOR USER WITH admin ROLE for regular USER, Showing list of flights)

## Select a flight row from the table.
A modal will appear allowing you to update the flight status.
Once a status is selected and confirmed, the table will refresh automatically with the updated status for the selected flight.

## Logout
To log out of the application:

## Click on the "Logout" button in the header, which will clear the JWT token from localStorage and redirect you to the login page.



### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShujaXCode/flight-dashboard.git

2. **Install dependencies:**
   ```bash
   npm install

3. **Start the development server:**
   ```bash
   npm run dev

4. **Docker Setup**
   ```bash
   docker build -t flight-dashboard .

5. **Run Docker Container**
   ```bash
   docker run -p 3000:3000 -e MONGODB_URI="mongodb+srv://magnus:SHuja4646@cluster0.i3anulp.mongodb.net/pikky" -e JWT_SECRET="ysdasddas" flight-dashboard

6. **Access Application**
   ```bash
   http://localhost:3000

### environment variables

1. **MONGODB_URI**
   ```bash
    mongodb+srv://magnus:SHuja4646@cluster0.i3anulp.mongodb.net/pikky

2. **JWT_SECRET**
  ```bash
  ysdasddas
