# Weather Application

This is a simple weather application built with React that allows users to search for weather information by city name and view the current weather conditions. It also provides weather information for the user's current location using the browser's geolocation API.You can also chnge the light and dark mode.

## Approach and Technologies Used

### Technologies Used:
- React: Used for building the user interface and managing application state.
- OpenWeatherMap API: Used for fetching weather data based on city names or geographic coordinates.
- Material-UI: Used for UI components and icons.
- CSS: Used for styling the application.

### Approach:
1. **Fetching Weather Data:** Weather data is fetched from the OpenWeatherMap API by sending requests with the city name or geographic coordinates.
2. **Displaying Weather Information:** The fetched weather data is displayed in the UI, including the city name, weather description, temperature, humidity, wind speed, current time, and date.
3. **User Interaction:** Users can search for weather information by entering a city name in the search input field. They can also view weather information for their current location by clicking on the search button.
4. **Styling:** Material-UI and custom CSS styles are used to enhance the visual appearance of the application.

## Instructions to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
