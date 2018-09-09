var friends = require('../data/friends');
var bodyParser = require("body-parser");

module.exports = function(app) {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Return all friends
    app.get('/api/friends', function(req, res) {
      return res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
      var newfriend = req.body;
      // Remove spaces
      newfriend.name.replace(/\s+/g, "");
      console.log("newfriend: " + JSON.stringify(newfriend));

      // Setting currentLowScore to an initial value that its comparitor will surely be less than
      var currentLowScore = 100;
      var bestMatch;
      
        // Loop through the friends array
        for (var i=0; i < friends.length; i++ ){
          var currentFriend = friends[i];
          var totalDifference = 0;
          console.log(totalDifference, "begin total difference");
          console.log(currentFriend, "this is the current friend");

          // Within each friend in the friends array, loop through each friend's (aka currentFriend's) scores and compare them to newfriend's scores
            for(var j=0; j < currentFriend.scores.length; j++) {

              // Take the absolute value of the difference between newfriend's and currentFriend's scores for all questions
              var difference = Math.abs(parseInt(newfriend.scores[j]) - parseInt(currentFriend.scores[j]));
              console.log("difference: " + difference);

              // Add each difference to totalDifference
              totalDifference += difference; 
              console.log("totalDifference: " + totalDifference);
            }

            // Find the lowest totalDifference
            console.log("currentLowScore: " + currentLowScore);
            console.log("totalDifference: " + totalDifference);
            if(totalDifference < currentLowScore) {
              currentLowScore = totalDifference;
              console.log("currentLowScore after comparison to totalDifference: " + currentLowScore);
              bestMatch = currentFriend;
            }

        }

      console.log(bestMatch, "this is bestMatch");
      res.json(bestMatch);

      // Push newfriend to friends array
      friends.push(newfriend);

      console.log("friends after newfriend added: " + JSON.stringify(friends));
      
      
    });

};