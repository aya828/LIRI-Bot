require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const inquirer = require('inquirer');
const moment = require('moment')
const fs = require('fs');

moment().format()

const questions = [
  {
    type: "list",
    name: 'search',
    message: "Pick a search:",
    choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
  }
]

  inquirer.prompt(questions)

  .then(function(response) {
    // console.log(response.search);
    switch (response.search) {
      case 'concert-this':
        console.log("concerts");
        concerts();
        break;
      case 'spotify-this-song':
        // console.log("songs");
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
        for( var i = 0; i < 5; i++) {
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city);
          let date = console.log(response.data[i].datetime);
          date = moment().format("MM DD YYYY");
        }
      })
      .catch(function (error) {
        // HANDLE ERROR
        console.log(error);
      })
    })
  }

  const songs = () => {
    let songQuestion = [
      {
        type: "input",
        name: "name",
        message: "Enter a song:"
      }
    ]
    inquirer.prompt(songQuestion)
    .then(function(response) {
      spotify
      .search({ type: 'track', query: response.name })
      .then(function(response) {
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].artists[0].external_urls);
        console.log(response.tracks.items[0].album.name);
      })
      .catch(function(err) {
        console.log(err);
      });
      })
  }

  const movies = () => {
    let movieQuestion = [
      {
        type: "input",
        name: "name",
        message: "Enter a movie:"
      }
    ]
    inquirer.prompt(movieQuestion)
    .then(function(response) {
      axios
      .get("https://www.omdbapi.com/?t=" + response.name + "&apikey=trilogy")
      .then(function (response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log("Imdb Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      })
    })
  }
