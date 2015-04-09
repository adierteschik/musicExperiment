commusicApp.factory('authInterceptor', ['$rootScope','$q','$window',function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            config.headers['X-Parse-Application-Id'] = 'wA1X62PkmOPrqLIsWEkJvSOAzcRJyLxmhlt6Ci63';
            config.headers['X-Parse-REST-API-Key'] = 'ksQVtDo9AADcWjyunOhqU7SvD8J0AudC7WvmVq65';
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        response: function (response) {
            // if (response.status === 401) {
            //     //erase token if login fails
            //     delete $window.sessionStorage.token;
            //     delete $window.sessionStorage.name;
            //     //TODO handle the general case where the user is not authenticated
            // }
            console.log("this is the response");
            console.log(response);
            return response || $q.when(response);
        }
    };
}]);