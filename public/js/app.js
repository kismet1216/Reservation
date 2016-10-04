var appp = angular.module('reservations', ['ngRoute', 'reservations.factory', 'reservations.filters', 'ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/guest', {
        templateUrl: '/html/guest.html',
        controller: GuestCtrl
      })
      .when('/login', {
        templateUrl: '/html/owner.html',
        //controller: LoginCtrl
      })
      .when('/list', {
        templateUrl: '/html/list.html',
        controller: DataCtrl
      })
      .when('/desk', {
        templateUrl: '/html/table.html',
        //controller: DeskCtrl
      })
      .when('/connect', {
        templateUrl: '/html/connect.html',
        controller: DataCtrl
      })
      .when('/profile', {
        templateUrl: '/html/profile.html',
        controller: ProCtrl
      })
      .otherwise({
        redirectTo: '/guest'
      });
    $locationProvider.html5Mode(false);
  }]);