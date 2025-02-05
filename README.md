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

      Click Tv shows to display a list of TV shows.
         
      Use the Genres button to browse movies by genre.
         
      Toggle themes by selecting Light or Dark.

## APIs

      OMDb API: Provides movie data such as title, genre, director, and plot.

      YouTube API: Fetches official movie trailers.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/moviebase.git
   Clone the repository:

   git clone <repository-url>

   Navigate to the project directory:

   cd movie-database-app

   Install dependencies:

   npm install

   Create a .env file in the root directory and add your YouTube API key:

   REACT_APP_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY

   Start the development server:

## Usage

      Enter a movie title in the search bar and click Search.

      Click Clear to reset the search.

      Select a movie card to view its details.

      Click Tv shows to display a list of TV shows.

      Use the Genres button to browse movies by genre.

      Toggle themes by selecting Light or Dark.

## APIs

      OMDb API: Provides movie data such as title, genre, director, and plot.

      YouTube API: Fetches official movie trailers.

## Project Structure

      movie-database-app/
      ├── src/
      │   ├── App.css         # Application styles
      │   ├── App.js          # Main component
      │   ├── index.js        # Entry point
      │   └── components/     # Reusable components
      └── public/

## Improvements

      Error Handling: Enhance error management for API requests.

      User Authentication: Allow personalized movie recommendations.

      Search Filtering: Add advanced filtering options.

      Performance Optimization: Improve autoscrolling logic and lazy load images.

      Responsive Design: Enhance layout for mobile devices.
