angular.module('commusicApp')

.controller('LoginsCtrl', ['$scope', '$http', '$window','$location', 'userService', function($scope, $http, $window, $location, userService) {
    $scope.testthis = function() {
        console.log("lala lala");
        FB.login(function(response) {

            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                //console.log(response); // dump complete info
                access_token = response.authResponse.accessToken; //get access token
                user_id = response.authResponse.userID; //get FB UID

                //   FB.api('/me', function(response) {
                //       user_email = response.email; //get user email
                // // you can store this data into your database             
                //   });
                testAPI();

            } else {
                //user hit cancel button
                console.log('User cancelled login or did not fully authorize.');

            }
        }, {
            scope: 'public_profile,email,user_likes'
        });

        (function() {
            var e = document.createElement('script');
            e.src = document.location.protocol + 'https://connect.facebook.net/en_US/all.js';
            e.async = true;
            document.getElementById('fb-root').appendChild(e);
        }());

        function getAllPages(path, options, cb) {
            var data = [];

            function getPage(after) {
                if (after) {
                    options.after = after;
                }
                FB.api("/me/music", options, function(response) {
                    if (!response || response.error) {
                        //Error...
                        return;
                    }
                    data = data.concat(response.data); //Adding this page
                    var after = response.paging && response.paging.cursors && response.paging.cursors.after
                    if (after) {
                        getPage(after);
                    } else {
                        cb(data);
                    }
                });
            }
            getPage();
        }

        function testAPI() {
            getAllPages("/me/music", {}, function(allItems) {
                console.log(allItems);
                var onlyMusicians = allItems.filter(function(item) {
                    return item.category == "Musician/band";
                })
                var names = onlyMusicians.map(function(item) {
                    return item.name;
                })
                console.log(names);
                $http.post('https://api.parse.com/1/classes/Person', {"artistList":names}).
				  success(function(data, status, headers, config) {
				  	console.log("success!" + status);
				  	console.log(data);
				  	userService.setUser(data.objectId);
				  	$window.location = '#spots'
				    // this callback will be called asynchronously
				    // when the response is available
				  }).
				  error(function(data, status, headers, config) {
				  	console.log("Error!" + status);
				  	console.log(data);
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				  });
                console.log("complete", names.length);
            });
        }
    }

}])

.controller('SpotsCtrl', ['$scope', '$http', '$window', 'userService', 'spotService', 'playlistService', function($scope, $http, $window, userService, spotService, playlistService) {
    $http.get('https://api.parse.com/1/classes/Spot').
    	success(function(data, status, headers, config) {
    		console.log("success!" + status);
    		console.log(data);
    		$scope.spots = [];
    		//take only relevant data to display and send
    		data.results.forEach(function(res) {
    			$scope.spots.push({'name': res.name, 'objectId': res.objectId});
    		});
    		console.log($scope.spots);
    	}).
    	error(function(data, status, headers, config) {
    		console.log("Error! failed miserably: " + status);
		  	console.log(data);
    	});
    $scope.sendSelectedSpot = function(spotId) {
    	spotService.setSpot(spotId);
    	console.log("spotID: " + spotId);
    	$http.post('https://api.parse.com/1/functions/joinSpot', {"personId": userService.getUser(), "spotId": spotId}).
    	success(function(data, status, headers, config) {
    		console.log("success in spot!");
    		console.log(data);
    		playlistService.setPlaylist(data.result);
    		$window.location = "#playlist";
    	}).
    	error(function(data, status, headers, config) {
    		console.log("Error! failed miserably: " + status);
		  	console.log(data);
    	});
    };



}])

.controller('PlaylistCtrl', ['$scope', function($scope) {
    $scope.playlist = {};


}]);
