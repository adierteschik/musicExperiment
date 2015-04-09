var commusicApp = angular.module('commusicApp', ['ngRoute']);

commusicApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/logins', {
            templateUrl: 'partials/logins.html',
            controller: 'LoginsCtrl'
        }).
        when('/spots', {
            templateUrl: 'partials/spots.html',
            controller: 'SpotsCtrl'
        }).
        when('/playlist', {
            templateUrl: 'partials/playlist.html',
            controller: 'PlaylistCtrl'
        }).
        otherwise({
            redirectTo: '/logins'
        });
    }
]);

commusicApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

commusicApp.service('userService', function() {
    var userId = '';
    return {
        setUser: function(aUserId) {
            userId = aUserId;
        },
        getUser: function() {
            return userId;
        }
    };
});

commusicApp.service('spotService', function() {
    var spotId = '';
    return {
        setSpot: function(aspotId) {
            spotId = aspotId;
        },
        getSpot: function() {
            return spotId;
        }
    };
});

commusicApp.service('playlistService', function() {
    var playlist = [];
    return {
        setSpot: function(playlistArray) {
            playlist = playlistArray;
        },
        getSpot: function() {
            return playlist;
        }
    };
});
