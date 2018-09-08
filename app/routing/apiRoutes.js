var friends = require('../data/friends');

module.exports = function(app) {

    // Return all friends
    app.get('/api/friends', function(req, res) {
      return res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
      var newfriend = req.body;
      // Remove spaces
      newfriend.name.replace(/\s+/g, "");
      console.log("newfriend: " + JSON.stringify(newfriend));

      // Push newfriend to friends array
      friends.push(newfriend);
      console.log("friends after newfriend added: " + JSON.stringify(friends));
    
      // This is supposed to run but I never see these console logs unless I add the callback function to the match() function. If I do that, the match logic doesn't work
      var bestMatch = match(newfriend, function(result){
        console.log(result, "this is result");
        res.json(result);
      });
      
    });

    // When I add the callback function cb, the modal works but the match is incorrect...I believe it's because it never makes it through the array...it stops partway through and I get an error "Error: Can't set headers after they are sent." When I take the callback function out, the modal no longer works but the match is correct in the Terminal output.

    function match(newfriend, cb) {
    // function match(newfriend) {
    
    // Setting this low score to an initial value that its comparitor will surely be less than
    var currentLowScore = 100;
    var bestMatch;
    
    // Loop through the friends array
    
      // added "-1" to "i < friends.length" because newfriend will always be added to the end of the array, so this way newfriend will never be equal to currentFriend
      for (var i=0; i < friends.length - 1; i++ ){
        var currentFriend = friends[i];
        var totalDifference = 0;
        console.log(totalDifference, "total difference");
        console.log(currentFriend, "this is the current friend");

          // Within each friend in the friends array, loop through each friend's (aka currentFriend's) scores and compare them to newfriend's scores
            for( var j=0; j < currentFriend.scores.length; j++) {

              // Take the absolute value of the difference between newfriend's and currentFriend's scores for all questions
              var difference =  Math.abs(newfriend.scores[j] - currentFriend.scores[j]);

              // Add each difference to totalDifference
              totalDifference += difference;
              
            }
            // Find the lowest totalDifference
            if( totalDifference < currentLowScore ) {
              lowScore = totalDifference;
              bestMatch = currentFriend;
            }

      console.log(bestMatch, "this is the best match");
      // return bestMatch;

      cb(bestMatch);
    }

  }

};