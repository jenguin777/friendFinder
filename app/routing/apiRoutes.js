var friends = require('../data/friends');

module.exports = function(app) {

  // Return all friends
  app.get('/api/friends', function(req, res) {
    return res.json(friends);
  });

  // Push newfriend to 
  app.post('/api/friends', function(req, res) {
    var newfriend = req.body;
    friends.push(newfriend);
   
    var bestMatch = match(newfriend , function(result){
      console.log(result, "this is result");
      res.json(result);
    } );
   
  });

  function match(newfriend, cb) {

    var lowScore = 100;
    var bestMatch;
    // Loop through the friends array
    for (var i=0; i < friends.length; i++ ){
      var currentFriend = friends[i];
      var totalDifference = 0;
      console.log(totalDifference, "total difference");
      console.log(currentFriend, "this is the current friend");

      // Loop through each friend's scores and compare them to newfriend's scores
      for( var j=0; j < currentFriend.scores.length; j++) {
          var difference =  Math.abs(newfriend.scores[j] - currentFriend.scores[j]);
          totalDifference += difference;
         
      }

      if( totalDifference < lowScore ) {
        lowScore = totalDifference;
        bestMatch = currentFriend;
      }

    }
    console.log(bestMatch, "this is the best match");

    cb(bestMatch);
  }



};