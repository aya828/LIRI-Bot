require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const inquirer = require('inquirer');
const moment = require('moment')
const fs = require('fs');

const questions = [
    {
      type: "list",
      name: 'search',
      message: "Pick a search:",
      choices: ['Concerts', 'Songs', 'Movies', 'Nothing']
    }
  ]

  inquirer.prompt(questions)

  .then(function(response) {
    switch (response) {
      case 'Concerts':
        console.log("concerts");
        concerts();
        break;
      case 'Songs':
        console.log("songs");
        songs();
        break;
      case 'Movies':
        movies();
        break;
      case 'Nothing':
        says();
        break 
    };
  

  const concerts = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter an artist/band:"
        }
      ])
      axios
          .get("https://rest.bandsintown.com/artists/"+ response.name + "/events?app_id=codingbootcamp")
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
  }



        

        // axios
        //   .get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
        //   .then(function (response) {
        //     console.log(response)
        //   })
      
        spotify
          .search({ type: 'track', query: 'All the Small Things' })
          .then(function(response) {
            // console.log(response);
            // console.log(response.tracks);
            console.log(response.tracks.items.length);



          })
          .catch(function(err) {
            console.log(err);
          });
        })