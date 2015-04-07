angular.module('commusicApp', ['ngRoute', 'commusicApp.controllers']);

angular.module('commusicApp').config(['$routeProvider',
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
            redirectTo: '/spots'
        });
    }
]);