var twitter = require("twitter");
var request = require("request");
var auth = require("./keys.js");
var SpotifyWebApi = require('spotify-web-api-node');
var holder = process.argv;
var command = process.argv[2];
var fs = require("fs");
switch (command) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spodify-this-song":
      findSong();
      break;

    case "movie-this":
      movie();
      break;
    case "do-this":
      doThis();
    };
    


function myTweets(){
    
    var client = new twitter ({
        consumer_key: auth.twitterKeys.consumer_key,
        consumer_secret: auth.twitterKeys.consumer_secret,
        access_token_key: auth.twitterKeys.access_token_key,
        access_token_secret:auth.twitterKeys.access_token_secret
    });
    var params = {screen_name: 'nodehw'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        for (var i = 0; i < tweets.length; i++){
            if (tweets[i].text){
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
        // console.log(tweets[0].text);
  })};

function movie(){
    let command = process.argv[2];
    let holder = process.argv;
    var movieName = "";
    for (var i = 3; i < holder.length; i++) {
        
        if (i > 3 && i < holder.length){
            movieName = movieName + "+" + holder[i];
          }
        else {
            movieName += holder[i];
        }
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {
        
          console.log("Title:" + JSON.parse(body).Title);
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Imdb Rating:" + JSON.parse(body).imdbRating);
          console.log("Actors:" + JSON.parse(body).Actors);
          console.log("Plot:" + JSON.parse(body).Plot);
          var RTName = movieName.split("+").join("_");
          console.log("Rottentomatoes URL" + "https://www.rottentomatoes.com/m/" + RTName);
        
      });
};

function findSong () {
    var spotifyApi = new SpotifyWebApi({
        clientId : 'cef3b01269ee4e38b28064b08cf09793',
        clientSecret : '63ba707c202141bda1d1c2c5d840c036'
        // redirectUri : 'http://www.example.com/callback'
      });
      spotifyApi.setAccessToken('BQChQ3_musW2ggxU-_RVRj_JMfUm88B2wr5vYuym1NxHr7Q5MVKtu5BcJCxI7B-G4F7XTagRpsuz9PmWgjatHOUS1YzpXCUR89UnzhkeehnQAEmK_yyrDAjgUwof4lyV3CmeaQHM2P6XLHIlcK7jffrHg1QNmTDekdLSpvMD567I');
    var songName = "";
    for (var i = 3; i < holder.length; i++) {
        
            songName += holder[i] + " ";
        }

      spotifyApi.searchTracks(songName)
      .then(function(data) {
        var trackId = data.body.tracks.items[0].id;

        spotifyApi.getTrack (trackId)
        .then(function(data) {
            console.log(data.body.album.artists[0].name);
        }, function(err) {
            console.error(err);
        });

      }, function(err) {
        console.error(err);
      });
      
}
function doThis(){
    fs.readFile("read.txt", "utf8", function(err, data){
        command = data;
    });
};