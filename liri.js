require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const inquirer = require('inquirer');
const moment = require('moment')
const fs = require('fs');

moment().format()

// USER WILL PICK OUT OF CHOICES TO RUN SEARCH
const questions = [
  {
    type: "list",
    name: 'search',
    message: "Pick a search:",
    choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
  }
]

  inquirer.prompt(questions)

  // FUNCTION FOR CHOSEN OPTION IN QUESTIONS PROMPT
  .then(function(response) {
    switch (response.search) {
      case 'concert-this':
        concerts();
        break;
      case 'spotify-this-song':
        songs();
        break;
      case 'movie-this':
        movies();
        break;
      case 'do-what-it-says':
        says();
        break 
    }
  })
  
  // BAND API 
  const concerts = () => {
    let bandQuestion = [
      {
        type: "input",
        name: "name",
        message: "Enter an artist/band:"
      }
    ]
    inquirer.prompt(bandQuestion)
    .then(function(response) {
    axios
      .get("https://rest.bandsintown.com/artists/" + response.name + "/events?app_id=codingbootcamp")
      .then(function (response) {
        // HANDLE SUCCESS
        for( var i = 0; i < response.data.length; i++) {
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city);
          console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }
      })
      .catch(function (error) {
        // HANDLE ERROR
        console.log(error);
      })
    })
  }

  // SPOTIFY SONG PROMPT
  const songs = () => {
    let songQuestion = [
      {
        type: "input",
        name: "name",
        message: "Enter a song:"
      }
    ]
    inquirer.prompt(songQuestion).then(function(response) {
      if(!response.name) {
        response.name = "the sign";
      }
      searchSpotifyForSong(response.name);
    });
  }

  // SPOTIFY SONG SEARCH AND DATA
  const searchSpotifyForSong = (query) => {
    console.log(query);
    spotify.search({ type: 'track', query: query })
    .then(function(response){
      console.log(response.tracks.items[0].artists[0].name);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].artists[0].external_urls);
      console.log(response.tracks.items[0].album.name); 
    })
    .catch(function(err) {
      // HANDLE ERROR
      console.log(err);
    });
  }

  // MOVIE NAME PROMPT
  const movies = () => {
    let movieQuestion = [
      {
        type: "input",
        name: "name",
        message: "Enter a movie:"
      }
    ]
    inquirer.prompt(movieQuestion).then(function(response) {
      if(!response.name) {
        response.name = "Mr. Nobody";
      }
      console.log(response.name);
      searchMovie(response.name);
    })
  }

  // MOVIE API AND DATA
  const searchMovie = (response) => {
    axios
    .get("https://www.omdbapi.com/?t=" + response.name + "&apikey=trilogy")
    .then(function (response) {
      // HANDLE SUCCESS
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(`Imdb Rating: ${response.data.imdbRating}`);
      console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(`Plot: ${response.data.Plot}`);
      console.log(`Actors: ${response.data.Actors}`);
    })
    .catch(function(err) {
      // HANDLE ERROR
      console.log(err);
    });
  }
  
  // PULL DATA FROM RANDOM.TXT FILE TO SEARCH
  const says = () => {
    fs.readFile('./random.txt', 'utf8',
    function read(err, data) {
      if (err) {
        // HANDLE ERROR
        console.log(err);
      }
      // HANDLE SUCCESS
        let randomText = data;
        let arr = randomText.split(',');
        let text = arr[1];
        searchSpotifyForSong(text);
    })
  }