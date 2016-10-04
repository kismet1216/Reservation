angular.module("reservations.factory",[]).
  factory('reservationFactory', function($http) {
    return {
      addRes: function(reservation) {
        return $http.post('/api/reservation/', reservation);
      },
      get_all: function() {
        return $http.get('/api/reservation/');
      },
      get_one: function(id) {
        return $http.get('/api/reservation/' + id);
      },
      editRes: function(id, reservation) {
        return $http.put('/api/reservation/' + id, reservation);
      },
      delRes: function(id) {
        return $http.delete('/api/reservation/delete/' + id);
      },
      searchRes: function(confirmNo) {
        return $http.get('/api/reservation/search/' + confirmNo);
      }
      //distributeDesk: function(id, deskNo) {
      //  return $http.put('/api/reservation/dd/' + id, deskNo);
      //}
    }
  });