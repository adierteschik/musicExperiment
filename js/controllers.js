angular.module('commusicApp.controllers', []);

angular.module('commusicApp.controllers').controller('LoginsCtrl', ['$scope', function($scope) {
    $scope.user = {};
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
                console.log("complete", names.length);
                //items.filter.map.....
            });
        }
    }

}]);

angular.module('commusicApp.controllers').controller('SpotsCtrl', ['$scope', function($scope) {
    $scope.spots = {};


}]);

angular.module('commusicApp.controllers').controller('PlaylistCtrl', ['$scope', function($scope) {
    $scope.playlist = {};


}]);
