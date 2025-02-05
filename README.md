# MovieBase

MovieBase is a web application built with React and Vite that allows users to search for movies, view recent releases, and explore movies by genre. The application leverages the OMDB API to fetch movie data and the YouTube API to fetch movie trailers.

## Features

- Search for movies by title
- View recent movie releases
- Explore movies by genre
- Fetch and display movie details
- Fetch and display movie trailers from YouTube
- Responsive design with theme switching
- Autoscrolling feature for horizontal movie lists.

## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [OMDB API](http://www.omdbapi.com/)
- [YouTube API](https://developers.google.com/youtube/v3)
- [ESLint](https://eslint.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Usage

      Enter a movie title in the search bar and click Search.

      Click Clear to reset the search.

      Select a movie card to view its details.

      Click TV Shows to display a list of TV shows.
         
      Use the Genres button to browse movies by genre.
         
      Toggle themes by selecting Light or Dark.

## APIs

      OMDb API: Provides movie data such as title, genre, director, and plot.

      YouTube API: Fetches official movie trailers.

## Installation

1. Clone the repository:
   
sh
   git clone https://github.com/your-username/moviebase.git


2. Navigate to the project directory:
   
sh
   cd movie-database-app


3. Install dependencies:
   
sh
   npm install


4. Create a .env file in the root directory and add your YouTube API key:
   
env
   REACT_APP_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY


5. Start the development server:
   
sh
   npm start


## Project Structure

      movie-database-app/
      ├── src/
      │   ├── App.css         # Application styles
      │   ├── App.js          # Main component
      │   ├── index.js        # Entry point
      │   └── components/     # Reusable components
      └── public/

## Improvements

- Error Handling: Enhance error management for API requests.
- User Authentication: Allow personalized movie recommendations.
- Search Filtering: Add advanced filtering options.
- Performance Optimization: Improve autoscrolling logic and lazy load images.
- Responsive Design: Enhance layout for mobile devices.

## Contributors

- **[Nondumiso Thwala](https://github.com/Nondumiso98)** - Project Lead
- **[Moloko Rakgoale](https://github.com/Moloko-DevOps95)** - Feature Development
- **[Philani Mancotywa](https://github.com/PhilaniMant)** - Design & UI
- **[Bennet Ramphisa](https://github.com/Bennet09)** - API Integration

## Website
'https://code-crafter-moviedatabase-41yc.onrender.com/'
